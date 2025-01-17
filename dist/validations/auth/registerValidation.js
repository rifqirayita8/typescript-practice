import { z } from "zod";
const registerSchema = z.object({
    email: z.string().email({ message: "Email tidak valid." }),
    password: z.string().min(6, { message: "Password minimal 6 karakter." }),
    username: z.string().min(3, { message: "Username minimal 3 karakter." }),
});
export const registerValidation = (data) => {
    return registerSchema.parse(data);
};
