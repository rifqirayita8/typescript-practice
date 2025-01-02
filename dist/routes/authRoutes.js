import express from 'express';
import userRegister from '../controllers/auth/registerController.js';
import userLogin from '../controllers/auth/loginController.js';
const app = express.Router();
app.post('/register', (req, res, next) => {
    userRegister(req, res, next);
});
app.post('/login', (req, res, next) => {
    userLogin(req, res, next);
});
export default app;
