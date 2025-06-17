var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { generateOTPService, verifyOtpService } from "../../services/auth/otpService.js";
export const generateOTPController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        yield generateOTPService(email);
        res.status(200).json({
            status: true,
            message: 'Kode OTP berhasil dikirim'
        });
    }
    catch (e) {
        next(e);
    }
});
export const verifyOTPController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        yield verifyOtpService(email, otp);
        res.status(200).json({
            status: true,
            message: 'OTP berhasil diverifikasi. Anda dapat melanjutkan'
        });
    }
    catch (e) {
        next(e);
    }
});
