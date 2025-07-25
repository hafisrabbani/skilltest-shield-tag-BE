import AuthService from "../service/AuthService.js";
import {SuccessResponse} from "../../common/response.js";

export default class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    async login(req, res, next) {
        try {
            const result = await this.authService.login(req.body, res.locals.context);
            return res.status(200).json(SuccessResponse({
                msg: "Login successful",
                data: result
            }));
        } catch (error) {
            next(error);
        }
    }

    async register(req, res, next) {
        try {
            await this.authService.register(req.body, res.locals.context);
            return res.status(201).json(SuccessResponse({
                msg: "User registered successfully"
            }));
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const userId = res.locals.user.id;
            await this.authService.logout(userId, res.locals.context);
            return res.status(200).json(SuccessResponse({
                msg: "Logout successful"
            }));
        } catch (error) {
            next(error);
        }
    }

    async getUser(req, res, next) {
        try {
            const userId = res.locals.user.id;
            const user = await this.authService.getUserById(userId);
            return res.status(200).json(SuccessResponse({
                msg: "User retrieved successfully",
                data: user
            }));
        } catch (error) {
            next(error);
        }
    }

    async getAuditLogs(req, res, next) {
        try {
            const userId = res.locals.user.id;
            const logs = await this.authService.getAuditLogUser(userId);
            return res.status(200).json(SuccessResponse({
                msg: "Audit logs retrieved successfully",
                data: logs
            }));
        } catch (error) {
            next(error);
        }
    }
}