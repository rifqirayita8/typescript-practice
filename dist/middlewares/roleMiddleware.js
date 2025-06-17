import { ForbiddenError } from '../utils/customError.js';
export const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const { role } = req.user || {};
        if (!role || role !== requiredRole) {
            throw new ForbiddenError('Anda tidak memiliki akses ke fitur ini.');
        }
        next();
    };
};
