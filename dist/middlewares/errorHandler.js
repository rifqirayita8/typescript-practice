import { z } from "zod";
import { AppError } from "../utils/customError.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
const errorHandler = (err, req, res, next) => {
    var _a;
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "false",
            message: err.message,
        });
    }
    else if (err instanceof z.ZodError) {
        const zodError = err.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
        }));
        return res.status(400).json({
            status: "false",
            message: "Validasi Gagal.",
            error: zodError
        });
    }
    else if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002" && ((_a = err.meta) === null || _a === void 0 ? void 0 : _a.target)) {
            const fieldName = Array.isArray(err.meta.target) ? err.meta.target[0] : undefined;
            let message = `${fieldName} sudah digunakan. Silakan gunakan ${fieldName} lain.`;
            message = message.charAt(0).toUpperCase() + message.slice(1);
            return res.status(400).json({
                status: "false",
                message: message,
            });
        }
    }
    res.status(500).json({
        status: "false",
        message: err.message,
    });
};
export default errorHandler;
