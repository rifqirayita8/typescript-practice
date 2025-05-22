import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../utils/customError.js";
import registerService from "../../services/auth/registerService.js";
import { User } from "../../models/user.js";

const userRegister= async (
  req: Request<{},{}, User>, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, password, confirmPassword, role = 'user' } = req.body;

    const missingFields: string[] = [];

if (!username) missingFields.push("username");
if (!email) missingFields.push("email");
if (!password) missingFields.push("password");
if (!confirmPassword) missingFields.push("confirmPassword");

if (missingFields.length > 0) {
  throw new ValidationError(`Field berikut harus diisi: ${missingFields.join(", ")}`);
}


    if (password != confirmPassword) {
      throw new ValidationError("Password dan konfirmasi password tidak sama.");
    }

    const user= await registerService({username, email, password, role});

    res.status(201).json({
      status: "true",
      message: "User berhasil ditambahkan.",
      payload: user,
    })
  }catch(error) {
    next(error);
  }
}

export default userRegister;