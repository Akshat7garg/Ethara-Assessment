class ApiError extends Error {
    statusCode: number;
    data: null;
    error: unknown[];
    success: boolean;

    constructor(
        statusCode: number,
        message = 'Something went wrong, please try again!!!',
        error: unknown[] = [],
        stack = ""
    ) {
        super(message);

        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.error = error;
        this.success = false;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };