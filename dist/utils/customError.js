export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}
export class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}
export class ForbiddenError extends AppError {
    constructor(message) {
        super(message, 403);
    }
}
export class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}
export class InternalServerError extends AppError {
    constructor(message) {
        super(message, 500);
    }
}
export function isAppError(error) {
    return error instanceof AppError;
}
