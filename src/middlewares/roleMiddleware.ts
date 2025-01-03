import { Request, Response, NextFunction } from 'express';

export const roleMiddleware= (requiredRole:string) => {
  return (req:Request, res: Response, next: NextFunction):void => {
    if (!req.user || req.user.role !== requiredRole) {
      res.status(403).json({
        status: "false",
        message: "Anda tidak memiliki akses ke fitur ini."
      });
    }
    next();
  }
}