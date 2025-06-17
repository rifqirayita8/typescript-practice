var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { forgetPassword } from "../../repositories/userManagementRepository.js";
import bcrypt from 'bcrypt';
import { forgetPasswordValidation } from "../../validations/userManagement/forgetPasswordValidation.js";
import { findOtp, deleteOtp } from "../../repositories/otpRepository.js";
import { hashOtp } from "../auth/otpService.js";
const forgetPasswordService = (otp, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    forgetPasswordValidation({ email, password });
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
    yield deleteOtp(email);
    const hashedPassword = yield bcrypt.hash(password, 10);
    password = hashedPassword;
    const data = yield forgetPassword(email, password);
    return data;
});
export default forgetPasswordService;
