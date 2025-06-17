var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { updateUser } from "../../repositories/userManagementRepository.js";
import bcrypt from 'bcrypt';
const updateUserService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.password) {
        const hashedPassword = yield bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
    }
    const user = yield updateUser(id, data);
    return user;
});
export default updateUserService;
