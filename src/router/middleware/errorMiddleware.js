import UnauthorizedException from "./unauthorizedException.js";
import JwtException from "./jwtException.js";
import { ZodError } from "zod";
import { zodErrorParser } from "../../common/validator.js";
import BadRequestException from "./badRequestException.js";
import { cmd } from "../../configs/winston.js";
import { ErrorResponse } from "../../common/response.js";

const errorMiddleware = (err, req, res, next) => {
    if (err instanceof JwtException) {
        return res.status(err.code).json(ErrorResponse({
            msg: err.message,
            type: err.name,
            errors: err.errors || []
        }));
    }

    if (err instanceof UnauthorizedException) {
        return res.status(err.code).json(ErrorResponse({
            msg: err.message,
            type: err.name,
            errors: []
        }));
    }

    if (err instanceof ZodError) {
        return res.status(400).json(ErrorResponse({
            msg: "Validation Error",
            type: "Validation Error",
            errors: zodErrorParser(err.errors)
        }));
    }

    if (err instanceof BadRequestException) {
        return res.status(err.code).json(ErrorResponse({
            msg: err.message,
            type: err.name,
            errors: err.errors || []
        }));
    }

    cmd.error("Internal Service Error:", err);
    return res.status(500).json(ErrorResponse({
        msg: err.message || "Internal Server Error",
        type: err.name || "InternalServerErrorException",
        errors: []
    }));
};

export default errorMiddleware;
