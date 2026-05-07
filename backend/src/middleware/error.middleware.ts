import { ErrorRequestHandler } from 'express';
import { Error as MongooseError } from 'mongoose';
import ErrorResponse from '../utils/errorResponse';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
    let error: ErrorResponse | Error = err;
    let statusCode = (err as ErrorResponse).statusCode || 500;
    let message = err.message || 'Server Error';

    if (err.name === 'CastError') {
        statusCode = 404;
        message = 'Resource not found';
        error = new ErrorResponse(message, statusCode);
    }

    if ((err as { code?: number }).code === 11000) {
        const keyValue = (err as { keyValue?: Record<string, unknown> }).keyValue || {};
        const field = Object.keys(keyValue)[0] || 'field';
        statusCode = 400;
        message = `Duplicate ${field}`;
        error = new ErrorResponse(message, statusCode);
    }

    if (err instanceof MongooseError.ValidationError) {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((v) => v.message)
            .join(', ');
        error = new ErrorResponse(message, statusCode);
    }

    if (process.env.NODE_ENV !== 'test') {
        console.error(err);
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorHandler;
