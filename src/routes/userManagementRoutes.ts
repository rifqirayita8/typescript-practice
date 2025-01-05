import express, { request } from 'express';
import { Request, Response, NextFunction } from 'express';
import readAllUserController from '../controllers/userManagement/readAllUserController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const userManagementRouter= express.Router();

userManagementRouter.use((req: Request, res:Response, next:NextFunction) => {
  authMiddleware(req, res, next);
});

userManagementRouter.get('/read-all-users', (req:Request, res: Response, next: NextFunction) => {
  roleMiddleware('admin')(req, res, next);
}, (readAllUserController));


export default userManagementRouter;