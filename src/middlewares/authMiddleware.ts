import { User } from "../models/user.js";
import { ForbiddenError, UnauthorizedError } from "../utils/customError.js";
import { verifyToken } from "../utils/jwtHelper.js";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token= req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Token tidak ditemukan.' });
  }

  try {
      const decoded= verifyToken(token.split(' ')[1]);
      req.user= decoded as {id:number, email: string, role:string};
      console.log('DECODED TOD', decoded);
      next();
  } catch(err) {
    return res.status(403).json({ status: 'error', message: 'Token invalid.' });
  }
};
