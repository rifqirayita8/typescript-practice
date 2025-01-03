import express from 'express';
import { Request, Response, NextFunction } from 'express';
import userRegister from '../controllers/auth/registerController.js';
import userLogin from '../controllers/auth/loginController.js';

const authRoutes= express.Router();

authRoutes.post('/register', (req: Request, res: Response, next: NextFunction) => {
  userRegister(req, res, next);
})

authRoutes.post('/login', (req: Request, res: Response, next: NextFunction) => {
  userLogin(req, res, next);
} )

export default authRoutes;