import express from 'express';
import authRouter from './routes/authRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
const app = express();
app.use(express.json());
app.use('/auth', authRouter);
const PORT = process.env.APP_PORT;
app.use((err, req, res, next) => {
    errorHandler(err, req, res, next);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
