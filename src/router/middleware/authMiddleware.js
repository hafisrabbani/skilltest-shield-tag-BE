import UnauthorizedException from "./unauthorizedException.js";
import { verifyToken } from "../../configs/jwt.js";
import { client } from "../../configs/redis.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) throw new UnauthorizedException("Error: No token provided");

        const bearer = token.split(" ")[1];
        if (!bearer) throw new UnauthorizedException("Error: Invalid token format");

        const session = await client.get(bearer);

        if (!session) {
            throw new UnauthorizedException("Unauthorized: Token not found in Redis");
        }

        const payload = verifyToken(bearer);
        if (!payload) throw new UnauthorizedException("Unauthorized: Invalid token");

        res.locals.user = payload;
        next();
    } catch (error) {
        next(error);
    }
};
