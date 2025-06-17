var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import readAllUserService from "../../services/userManagement/readAllUserService.js";
import { ValidationError } from "../../utils/customError.js";
const readAllUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page || "1", 10);
        const limit = 10;
        if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
            throw new ValidationError("Query page dan limit harus berupa angka dan lebih besar dari 0.");
        }
        const users = yield readAllUserService(page, limit);
        res.status(200).json({
            status: "true",
            message: "Data user berhasil didapatkan.",
            payload: users,
        });
    }
    catch (err) {
        next(err);
    }
});
export default readAllUserController;
