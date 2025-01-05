import { Request, Response, NextFunction } from "express";
import deleteUserService from "../../services/userManagement/deleteUserService.js";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware.js";

const deleteUserController= async(req: Request, res: Response, next: NextFunction) => {
  const userId= parseInt(req.params.id, 10);

  try {
    const user= await deleteUserService(userId);
    res.status(200).json({
      status: "true",
      message: "User berhasil dihapus.",
      payload: user
    })
  } catch(err) {
    next(err);
  }
}

export default deleteUserController;