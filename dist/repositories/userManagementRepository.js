var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../config/prismaClient.js";
import { findUserByEmail } from "./authRepository.js";
export const readAllUser = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findMany({
        take: limit,
        skip: (page - 1) * limit,
    });
});
export const findUserbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: {
            id: id
        }
    });
});
export const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield findUserbyId(id);
    if (!user) {
        return null;
    }
    return yield prisma.user.update({
        where: { id: id },
        data: {
            username: data.username,
            email: data.email,
            password: data.password
        }
    });
});
export const forgetPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield findUserByEmail(email);
    if (!user) {
        throw new Error('User tidak ditemukan');
    }
    return prisma.user.update({
        where: { email },
        data: { password }
    });
});
export const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.delete({
        where: {
            id: id
        },
    });
});
