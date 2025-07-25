import db from '../../configs/db.js';
import bcrypt from 'bcryptjs';
import BadRequestException from "../../router/middleware/badRequestException.js";
import {signToken} from "../../configs/jwt.js";
import {validator} from "../../common/validator.js";
import {LoginSchema, RegisterSchema} from "../schema/UserSchema.js";
import {client} from "../../configs/redis.js";
import {JWTExpirationToSec} from "../../common/helper.js";
import eventEmitter from "../../configs/event.js";

export default class AuthService {
    async login(req, ctx) {
        const validData = validator(LoginSchema, req);
        const user = await db('users').where({ email: validData.email }).first();
        if (!user) {
            throw new BadRequestException("User not found with this email");
        }
        const isPasswordValid = await bcrypt.compare(validData.password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException("Invalid password");
        }
        client.set(`user:${user.id}`, JSON.stringify({
            id: user.id,
            email: user.email
        }), {
            EX: JWTExpirationToSec(),
        });
        eventEmitter.emit('user.logged_in', {
            user_id: user.id,
            email: user.email,
            ip: ctx?.ip,
            user_agent: ctx?.userAgent
        });

        return {
            token: signToken({ id: user.id, email: user.email }),
            user: {
                id: user.id,
                email: user.email
            }
        };
    }

    async logout(userId, ctx) {
        await client.del(`user:${userId}`);
        eventEmitter.emit('user.logged_out', {
            user_id: userId,
            ip: ctx?.ip,
            user_agent: ctx?.userAgent
        });
        return true;
    }

    async getUserById(userId) {
        const user = await db('users').where({ id: userId }).first();
        if (!user) {
            throw new BadRequestException("User not found");
        }
        return {
            id: user.id,
            email: user.email
        };
    }

    async register(data, ctx) {
        const validData = validator(RegisterSchema, data);
        const existingUser = await db('users').where({ email: validData.email }).first();
        if (existingUser) {
            throw new BadRequestException("User already exists with this email");
        }
        const encryptedPassword = await bcrypt.hash(validData.password, 10);
        await db('users').insert({
            email: validData.email,
            password: encryptedPassword
        });
        const user = await db('users').where({ email: validData.email }).first();
        if (!user) {
            throw new BadRequestException("User registration failed");
        }
        eventEmitter.emit('user.registered', {
            user_id: user.id,
            email: user.email,
            ip: ctx?.ip,
            user_agent: ctx?.userAgent
        });
        return true;
    }

    async getAuditLogUser(userId) {
        return await db('auth_logs').where({user_id: userId});
    }
}
