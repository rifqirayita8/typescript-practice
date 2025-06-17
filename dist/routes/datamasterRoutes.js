import express from 'express';
import getUniversitasController from '../controllers/datamaster/getUniversitasController.js';
const datamasterRouter = express.Router();
datamasterRouter.get('/universitas', getUniversitasController);
export default datamasterRouter;
