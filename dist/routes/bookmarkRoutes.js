import express from 'express';
import addBookmarkController from '../controllers/bookmark/addBookmarkController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const bookmarkRouter = express.Router();
bookmarkRouter.use((req, res, next) => {
    authMiddleware(req, res, next);
});
bookmarkRouter.post('/add', addBookmarkController);
export default bookmarkRouter;
