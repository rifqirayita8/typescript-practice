import { z } from "zod";
import { AppError } from "../utils/customError.js";
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

 const errorHandler= (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    
  } else if (err instanceof z.ZodError) {
    const zodError= err.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({
      status: "error",
      message: "Data tidak sesuai.",
      error: zodError
    });

  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002" && err.meta?.target) {
      const fieldName= Array.isArray(err.meta.target) ? err.meta.target[0] : undefined;
      let message= `${fieldName} sudah digunakan. Silakan gunakan ${fieldName} lain.`;
      message= message.charAt(0).toUpperCase() + message.slice(1);
      return res.status(400).json({
        status: "error",
        message: message,
      })
    }
  }
  
  res.status(500).json({
    status: "error",
    message: err.message,
  })
}

export default errorHandler;