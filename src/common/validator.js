import BadRequestException from "../router/middleware/badRequestException.js";

export const validator = (schema,data) => {
    return schema.parse(data);
}

export const customValidator = (
    {
        data,
        callback,
        errorMsg = "Bad Request"
    }
) => {
    const result = callback(data);
    if (result.error) {
        throw new BadRequestException(errorMsg)
    }
    return true;
}

export const zodErrorParser = (zodError) => {
    return zodError.map(error => {
        return {
            field: error.path[error.path.length -1],
            message: error.message
        }
    });
};
