export default class InternalServerErrorException extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalServerErrorException";
        this.code = 500;
    }
}