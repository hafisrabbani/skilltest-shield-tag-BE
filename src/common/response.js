export function SuccessResponse(
    {
        msg,
        data,
        pagination
    }
) {
    const response = {}
    response.message = msg;
    if (data) response.data = data;
    if (pagination) response.meta = pagination;
    return response;
}

export function ErrorResponse(
    {
        msg,
        errors,
        type
    }
) {
    const response = {}
    response.message = msg || "An error occurred";
    if (errors) response.errors = errors;
    if (type) response.type = type;
    return response;
}
