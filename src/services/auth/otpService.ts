import { createOtp, findOtp, deleteOtp } from "../../repositories/otpRepository.js";
import { sendOtpEmail } from "../../utils/emailHelper.js";
import crypto from 'crypto';

const OTP_EXPIRATION_TIME= 5 * 60 * 1000;

export const hashOtp= (otp:string):string => {
  return crypto.createHash('sha256').update(otp).digest('hex');
}

export const generateOTPService= async(email:string) => {
  await deleteOtp(email);

  const otp= crypto.randomInt(100000, 999999).toString();
  const hashedOtp= hashOtp(otp);
  const expiresAt= new Date(Date.now() + OTP_EXPIRATION_TIME);

  await createOtp(email, hashedOtp, expiresAt);

  await sendOtpEmail(
    email,
    'Kode OTP Anda',
    `<h1>Kode OTP Anda adalah ${otp}</h1><p>Kode ini akan berlaku selama 5 menit</p>`
  ); 

  return otp;
}


export const verifyOtpService= async(email: string, otp: string) => {
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

  return true;
}