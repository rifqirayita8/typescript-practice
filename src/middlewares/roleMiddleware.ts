import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware.js';
import { ForbiddenError } from '../utils/customError.js';

export const roleMiddleware= (requiredRole:string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const {role}= req.user || {};
    if (!role || role !== requiredRole) {
        throw new ForbiddenError('Anda tidak memiliki akses ke fitur ini.');       
    }
    next();
}
}