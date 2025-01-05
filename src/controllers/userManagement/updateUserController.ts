import { AuthenticatedRequest } from "../../middlewares/authMiddleware.js";
import updateUserService from "../../services/userManagement/updateUserService.js";
import { Request, Response, NextFunction } from "express";

const updateUserController= async(req:AuthenticatedRequest, res:Response, next: NextFunction) => {
  const userId= req.user!.id;
  const {username, email, password} = req.body;

  try {
    const user= await updateUserService(userId, {username, email, password});
    res.status(200).json({
      status: "true",
      message: "User berhasil diupdate.",
      payload: user
    })
  } catch (err) {
    next(err);
  }
}

export default updateUserController;