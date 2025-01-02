var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../../models/prismaClient.js";
export const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.create({
        data: {
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role
        }
    });
});
export const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: {
            email: email
        }
    });
});
//https://vavada-bns2.top/#vs-e808991177665
