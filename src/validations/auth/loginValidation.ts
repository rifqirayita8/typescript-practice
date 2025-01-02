import { z } from "zod"; 

const loginSchema= z.object({
  email: z.string().email({message: "Email tidak valid."}),
  password: z.string().min(6, {message: "Password minimal 6 karakter."}),
});

export const loginValidation= (data: unknown) => {
  return loginSchema.parse(data);
} 