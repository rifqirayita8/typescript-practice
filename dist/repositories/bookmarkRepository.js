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
export const createBookmark = (userId, universityId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.bookmark.create({
        data: {
            userId: userId,
            universitasId: universityId
        }
    });
});
export const deleteBookmark = (userId, universityId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.bookmark.delete({
        where: {
            userId_universitasId: {
                userId: userId,
                universitasId: universityId
            }
        }
    });
});
export const getBookmark = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.bookmark.findMany({
        where: { userId }
    });
});
export const isBookmarked = (userId, universityId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.bookmark.findUnique({
        where: {
            userId_universitasId: {
                userId: userId,
                universitasId: universityId
            }
        }
    });
});
