export default class UnauthorizedException extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedException";
        this.code = 401;
    }
}