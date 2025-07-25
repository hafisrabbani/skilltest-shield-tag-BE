import jwt from 'jsonwebtoken';
import "dotenv/config";
import JwtException from "../router/middleware/jwtException.js";

const config = {
    jwtSecret: process.env.JWT_SECRET || "secret",
    jwtExpiration: process.env.JWT_EXPIRATION || "1d",
    algorithms: process.env.JWT_ALGORITHMS || "HS256"
};

const signToken = (payload) => {
    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.jwtExpiration,
        algorithm: config.algorithms
    });
}

const verifyToken = (token) => {
    try{
        return jwt.verify(token, config.jwtSecret);
    }catch(err){
        throw new JwtException("Invalid token");
    }
}


export { signToken, verifyToken };