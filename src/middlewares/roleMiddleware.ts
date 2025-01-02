import { Request, Response, NextFunction } from 'express';

export const roleMiddleware= (requiredRole:string) => {
  return (req:Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({
        status: "false",
        message: "Anda tidak memiliki akses ke fitur ini."
      });
    }
    next();
  }
}