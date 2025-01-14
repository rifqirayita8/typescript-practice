import forgetPasswordService from "../../services/userManagement/forgetPasswordService.js";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../utils/customError.js";

const forgetPasswordController= async(req: Request, res: Response, next:NextFunction):Promise<void> => {
  const {otp, email, password, confirmPassword} = req.body;

  try {

    if (!otp) {
      throw new Error('Kode OTP harus diisi.');
    }

    if(!email || !password || !confirmPassword) {
      throw new ValidationError('Email, password, dan konfirmasi password harus diisi.');
    }

    if (password !== confirmPassword) {
      throw new ValidationError('Password dan konfirmasi password harus sama.');
    }

    await forgetPasswordService(otp, email, password);
    res.status(200).json({
      status: true,
      message: 'Password berhasil direset. Silahkan login dengan password baru.'
    })

  } catch(e) {
    next(e);
  }
}

export default forgetPasswordController;