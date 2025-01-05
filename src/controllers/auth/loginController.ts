import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user.js";
import loginService from "../../services/auth/loginService.js";
import { ValidationError } from "../../utils/customError.js";

const userLogin= async (
  req: Request<{},{}, User>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data= req.body;

    if (!data) {
      throw new ValidationError('Semua field harus diisi.');
    }

    const {token}= await loginService(data);
    res.status(200).json({
      status: "true",
      message: "Login berhasil.",
      token: token
    })
  }catch (err){
    next(err);
  }
}   

export default userLogin;