export default class BadRequestException extends Error {
    constructor(message, errors = null) {
        super(message);
        this.errors = errors;
        this.name = "BadRequestException";
        this.code = 400;
    }
}