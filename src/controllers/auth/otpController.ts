import { generateOTPService, verifyOtpService } from "../../services/auth/otpService.js";
import { Request, Response, NextFunction } from "express";

export const generateOTPController= async (req:Request, res:Response, next:NextFunction):Promise<void> => {
  try {
    const {email} = req.body;
    await generateOTPService(email);
    res.status(200).json({
      status: true,
      message: 'Kode OTP berhasil dikirim'
    })
  }catch(e) {
    next(e);
  }
}


export const verifyOTPController= async(req:Request, res:Response, next:NextFunction) => {
  const {email, otp} = req.body;

  try {
    await verifyOtpService(email, otp);
    res.status(200).json({
      status: true,
      message: 'OTP berhasil diverifikasi. Anda dapat melanjutkan'
    })
  } catch(e) {
    next(e);
  }
}