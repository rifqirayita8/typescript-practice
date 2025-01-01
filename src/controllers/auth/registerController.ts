import { Request, Response, NextFunction } from "express";
import { isAppError, ValidationError } from "../../utils/customError.js";
import register from "../../services/auth/registerService.js";

interface RegisterReqBody {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const userRegister= async (
  req: Request<{},{}, RegisterReqBody>, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const {username, email, password, confirmPassword}= req.body;

    if (!username || !email || !password || !confirmPassword) {
      throw new ValidationError("Semua field harus diisi.");
    }

    if (password != confirmPassword) {
      throw new ValidationError("Password dan konfirmasi password tidak sama.");
    }

    const user= await register({username, email, password});

    res.status(201).json({
      message: "User berhasil ditambahkan.",
      user: user,
    })
  }catch(error) {
    next(error);
  }
}

export default userRegister;