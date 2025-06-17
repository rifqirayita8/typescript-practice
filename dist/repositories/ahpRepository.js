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
export function findAllUniversitas() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.universitas.findMany({
            select: {
                name: true,
                tuition_fee: true,
                accreditation: true,
                pass_percentage: true,
                latitude: true,
                longitude: true,
                major_count: true,
                acceptanceRate: true,
            },
        });
    });
}
