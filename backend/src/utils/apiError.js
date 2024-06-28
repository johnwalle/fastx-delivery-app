class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = "") {
        super(message);
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
        this.statusCode = statusCode;
        this.isOperational = isOperational;
    }

    toJSON() {
        return {
            error: true,
            code: this.statusCode,
            message: this.message,
            stack: this.stack,
        };
    }
}

module.exports = ApiError;