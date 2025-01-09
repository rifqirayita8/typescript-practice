import {z} from "zod";

const forgetPasswordSchema= z.object({
  password: z.string().min(6, {message: "Password minimal 6 karakter."}),
})

export const forgetPasswordValidation= (data: unknown) => {
  return forgetPasswordSchema.parse(data);
}