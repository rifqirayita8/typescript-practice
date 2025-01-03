import express from 'express';
import { Request, Response, NextFunction } from 'express';
import readAllUserController from '../controllers/userManagement/readAllUserController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const userManagementRouter= express.Router();

// userManagementRouter.use(authMiddleware);
userManagementRouter.get('/read-all-users', readAllUserController);


export default userManagementRouter;