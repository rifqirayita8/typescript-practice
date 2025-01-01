export class AppError extends Error{
  constructor(public message:string, public statusCode: number) {
    super(message);
    this.statusCode= statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
      super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
      super(message, 401);
  }
}

export class NotFoundError extends AppError {
  constructor(message : string) {
      super(message, 404);
  }
}

export class InternalServerError extends AppError {
  constructor(message : string) {
      super(message, 500);
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}