import express from 'express';
import { Request, Response, NextFunction } from 'express';
import userRegister from '../controllers/auth/registerController.js';
import userLogin from '../controllers/auth/loginController.js';
import { generateOTPController, verifyOTPController } from '../controllers/auth/otpController.js';
import otpRateLimiter from '../middlewares/otpMiddleware.js';

const authRoutes= express.Router();

authRoutes.post('/register', userRegister);

authRoutes.post('/login', userLogin);

authRoutes.post('/request-otp', otpRateLimiter ,generateOTPController);

authRoutes.post('/verify-otp', verifyOTPController);

export default authRoutes;