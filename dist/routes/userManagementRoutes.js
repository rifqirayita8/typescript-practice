import express from 'express';
import readAllUserController from '../controllers/userManagement/readAllUserController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import updateUserController from '../controllers/userManagement/updateUserController.js';
import deleteUserController from '../controllers/userManagement/deleteUserController.js';
import forgetPasswordController from '../controllers/userManagement/forgetPasswordController.js';
const userManagementRouter = express.Router();
//public routes
userManagementRouter.patch('/forget-password', forgetPasswordController);
//private routes
userManagementRouter.use((req, res, next) => {
    authMiddleware(req, res, next);
});
userManagementRouter.patch('/update-user', updateUserController);
userManagementRouter.get('/read-all-users', (req, res, next) => {
    roleMiddleware('admin')(req, res, next);
}, (readAllUserController));
userManagementRouter.delete('/delete-user/:id', (req, res, next) => {
    roleMiddleware('admin')(req, res, next);
}, (deleteUserController));
export default userManagementRouter;
