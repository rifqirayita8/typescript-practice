import express from 'express';
import { Request, Response, NextFunction } from 'express';
import userRegister from '../controllers/auth/registerController.js';

const app= express.Router();

app.post('/register', (req: Request, res: Response, next: NextFunction) => {
  userRegister(req, res, next);
})

export default app;