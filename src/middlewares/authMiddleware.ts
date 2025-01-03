import { ForbiddenError, UnauthorizedError } from "../utils/customError.js";
import { verifyToken } from "../utils/jwtHelper.js";
import { Request, Response, NextFunction } from "express";


export const authMiddleware= async (req: Request, res: Response, next: NextFunction) => {
  const token= req.header('Authorization');
  if (!token) {
    throw new UnauthorizedError('Token tidak ditemukan.');
  }

  try {
    const decoded= verifyToken(token.split(' ')[1]);
    req.user= decoded;
    next();
  } catch (err) {
    res.status(403).json({ status: 'error', message: 'Token invalid' });
  }
}