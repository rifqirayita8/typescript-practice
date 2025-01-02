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
    const {email, password}= req.body;

    if (!email || !password) {
      throw new ValidationError('Semua field harus diisi.');
    }

    const {token}= await loginService({email, password});
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