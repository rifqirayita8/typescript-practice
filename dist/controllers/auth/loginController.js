var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import loginService from "../../services/auth/loginService.js";
import { ValidationError } from "../../utils/customError.js";
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ValidationError('Semua field harus diisi.');
        }
        const { token } = yield loginService({ email, password });
        res.status(200).json({
            status: "true",
            message: "Login berhasil.",
            token: token
        });
    }
    catch (err) {
        next(err);
    }
});
export default userLogin;
