import express from 'express';
import userRankInput from '../controllers/ahp/ahpRankController.js';
const ahpRouter = express.Router();
ahpRouter.post('/rank', userRankInput);
export default ahpRouter;
