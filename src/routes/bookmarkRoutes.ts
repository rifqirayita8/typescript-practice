import express from 'express';
import addBookmarkController from '../controllers/bookmark/addBookmarkController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { Request, Response, NextFunction } from 'express';


const bookmarkRouter = express.Router();

bookmarkRouter.use((req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req, res, next);
})

bookmarkRouter.post('/add', addBookmarkController);


export default bookmarkRouter;