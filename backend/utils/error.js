class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if (err.name === "CastError") {
        const message = `Invalid Resource not found ${err.path}`;
        err.statusCode = 404; 
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export { ErrorHandler };
