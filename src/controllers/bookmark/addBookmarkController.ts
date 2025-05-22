import addBookmark from "../../services/bookmark/addBookmarkService.js";
import { Request, Response, NextFunction } from "express";

const addBookmarkController= async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {userId, universityId}= req.body;
    await addBookmark(userId, universityId)

    res.status(201).json({
      status: "true",
      message: "Bookmark berhasil ditambahkan."
    })
  } catch(err) {
    next(err);
  }
}

export default addBookmarkController;