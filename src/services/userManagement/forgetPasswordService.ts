import { forgetPassword } from "../../repositories/userManagementRepository.js";
import bcrypt from 'bcrypt';
import { forgetPasswordValidation } from "../../validations/userManagement/forgetPasswordValidation.js";
import { findOtp, deleteOtp } from "../../repositories/otpRepository.js";
import { hashOtp } from "../auth/otpService.js";

const forgetPasswordService= async(otp: string, email:string, password: string) => {
  forgetPasswordValidation({email, password});

  const storedOtp= await findOtp(email);
  if (!storedOtp) {
    throw new Error('OTP tidak ditemukan');
  }

  const hashedOtp= hashOtp(otp);

  if (storedOtp.otp !== hashedOtp) {
    throw new Error('OTP salah');
  }

  if(new Date() > storedOtp.expiresAt) {
    throw new Error('OTP kadaluarsa');
  }

  await deleteOtp(email);
  
  const hashedPassword= await bcrypt.hash(password, 10);
  password= hashedPassword;

  const data= await forgetPassword(email, password);
  return data;
}

export default forgetPasswordService;