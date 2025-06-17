var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createOtp, findOtp, deleteOtp } from "../../repositories/otpRepository.js";
import { sendOtpEmail } from "../../utils/emailHelper.js";
import crypto from 'crypto';
const OTP_EXPIRATION_TIME = 5 * 60 * 1000;
export const hashOtp = (otp) => {
    return crypto.createHash('sha256').update(otp).digest('hex');
};
export const generateOTPService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    yield deleteOtp(email);
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = hashOtp(otp);
    const expiresAt = new Date(Date.now() + OTP_EXPIRATION_TIME);
    yield createOtp(email, hashedOtp, expiresAt);
    yield sendOtpEmail(email, 'Kode OTP Anda', `<h1>Kode OTP Anda adalah ${otp}</h1><p>Kode ini akan berlaku selama 5 menit</p>`);
    return otp;
});
export const verifyOtpService = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const storedOtp = yield findOtp(email);
    if (!storedOtp) {
        throw new Error('OTP tidak ditemukan');
    }
    const hashedOtp = hashOtp(otp);
    if (storedOtp.otp !== hashedOtp) {
        throw new Error('OTP salah');
    }
    if (new Date() > storedOtp.expiresAt) {
        throw new Error('OTP kadaluarsa');
    }
    return true;
});
