import { Request, Response, NextFunction } from "express";
import register from "../../services/auth/registerService.js";

const userRegister= async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const {username, email, password}= req.body;

    if (!username || !email || !password) {
      return res.status(400).json({message: "Semua fields wajib diisi."});
    }

    const user= await register({username, email, password});

    return res.status(201).json({
      message: "User berhasil ditambahkan.",
      user: user,
    })
  }catch(error) {
    return res.status(500).json({message: error});
    // next(error);
  }
}

export default userRegister;