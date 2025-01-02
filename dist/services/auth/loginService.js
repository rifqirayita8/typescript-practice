var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import { findUserByEmail } from "../../repositories/auth/authRepository.js";
import { loginValidation } from "../../validations/auth/loginValidation.js";
import { NotFoundError, ValidationError } from "../../utils/customError.js";
import { generateToken } from "../../utils/jwtHelper.js";
const loginService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    loginValidation(data);
    const user = yield findUserByEmail(data.email);
    if (!user) {
        throw new NotFoundError('Email belum terdaftar.');
    }
    const isValidPassowrd = yield bcrypt.compare(data.password, user.password);
    if (!isValidPassowrd) {
        throw new ValidationError('Password salah.');
    }
    const token = generateToken(user);
    return { token, user };
});
export default loginService;
