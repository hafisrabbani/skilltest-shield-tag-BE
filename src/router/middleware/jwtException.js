export default class JwtException extends Error {
    constructor(message) {
        super(message);
        this.name = "JwtException";
        this.code = 401;
    }
}