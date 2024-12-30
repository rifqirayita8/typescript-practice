import { AppError } from "../utils/customError.js";
import { Request, Response, NextFunction } from "express";

export const errorHandler= (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  })
}