import { z } from "zod"; 

const registerSchema= z.object({
  email: z.string().email({message: "Email tidak valid."}),
  password: z.string().min(6, {message: "Password minimal 6 karakter."}),
  username: z.string().min(3, {message: "Username minimal 3 karakter."}),
  role: z.enum(["admin", "user"], { message: "Role harus admin atau user." }),
});

export const registerValidation= (data: unknown) => {
  return registerSchema.parse(data);
} 