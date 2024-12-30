import express from 'express';
import authRouter from './routes/authRoutes.js';

const app= express();

app.use(express.json());
app.use('/auth', authRouter);

const PORT= process.env.APP_PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})