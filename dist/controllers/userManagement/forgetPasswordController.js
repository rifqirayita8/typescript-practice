var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import forgetPasswordService from "../../services/userManagement/forgetPasswordService.js";
import { ValidationError } from "../../utils/customError.js";
const forgetPasswordController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, email, password, confirmPassword } = req.body;
    try {
        if (!otp) {
            throw new Error('Kode OTP harus diisi.');
        }
        if (!email || !password || !confirmPassword) {
            throw new ValidationError('Email, password, dan konfirmasi password harus diisi.');
        }
        if (password !== confirmPassword) {
            throw new ValidationError('Password dan konfirmasi password harus sama.');
        }
        yield forgetPasswordService(otp, email, password);
        res.status(200).json({
            status: true,
            message: 'Password berhasil direset. Silahkan login dengan password baru.'
        });
    }
    catch (e) {
        next(e);
    }
});
export default forgetPasswordController;
