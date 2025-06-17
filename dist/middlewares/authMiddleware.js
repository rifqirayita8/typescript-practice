var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { verifyToken } from "../utils/jwtHelper.js";
export const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Token tidak ditemukan.' });
    }
    try {
        const decoded = verifyToken(token.split(' ')[1]);
        req.user = decoded;
        console.log('DECODED TOD', decoded);
        next();
    }
    catch (err) {
        return res.status(403).json({ status: 'error', message: 'Token invalid.' });
    }
});
