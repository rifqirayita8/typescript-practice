import express from 'express';
import authRouter from './routes/authRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import { Request, Response, NextFunction } from 'express';
import userManagementRouter from './routes/userManagementRoutes.js';
import helmet from 'helmet';

const app= express();

app.use(helmet());

app.use(express.json());
app.use('/auth', authRouter);
app.use('/user-management', userManagementRouter);

const PORT= process.env.APP_PORT;

app.use((err: Error,req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})