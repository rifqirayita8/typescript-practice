var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import { createUser } from '../../repositories/auth/authRepository.js';
import { registerValidation } from '../../validations/auth/registerValidation.js';
const registerService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    registerValidation(data);
    const hashedPassword = yield bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const user = yield createUser(data);
    return user;
});
export default registerService;
