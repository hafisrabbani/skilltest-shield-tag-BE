import UnauthorizedException from "./unauthorizedException.js";
import {verifyToken} from "../../configs/jwt.js";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) throw new UnauthorizedException("Error: No token provided");
        const bearer = token.split(" ")[1];
        const payload = verifyToken(bearer);
        if (!payload) throw new UnauthorizedException("Unauthorized: Invalid token");
        res.locals.user = payload;
        next();
    } catch (error) {
        throw new UnauthorizedException("Unauthorized");
    }
}
