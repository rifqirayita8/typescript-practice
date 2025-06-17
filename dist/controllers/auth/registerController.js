var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ValidationError } from "../../utils/customError.js";
import registerService from "../../services/auth/registerService.js";
const userRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, confirmPassword, role = 'user' } = req.body;
        const missingFields = [];
        if (!username)
            missingFields.push("username");
        if (!email)
            missingFields.push("email");
        if (!password)
            missingFields.push("password");
        if (!confirmPassword)
            missingFields.push("confirmPassword");
        if (missingFields.length > 0) {
            throw new ValidationError(`Field berikut harus diisi: ${missingFields.join(", ")}`);
        }
        if (password != confirmPassword) {
            throw new ValidationError("Password dan konfirmasi password tidak sama.");
        }
        const user = yield registerService({ username, email, password, role });
        res.status(201).json({
            status: "true",
            message: "User berhasil ditambahkan.",
            payload: user,
        });
    }
    catch (error) {
        next(error);
    }
});
export default userRegister;
