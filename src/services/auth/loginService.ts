import bcrypt from "bcrypt";
import { findUserByEmail } from "../../repositories/authRepository.js";
import { loginValidation } from "../../validations/auth/loginValidation.js";
import { NotFoundError, ValidationError } from "../../utils/customError.js";
import { generateToken } from "../../utils/jwtHelper.js";
import { User } from "../../models/user.js";

const loginService= async (data: User) => {
  
  loginValidation(data);

  const user = await findUserByEmail(data.email!);
if (!user) {
  throw new NotFoundError('Email belum terdaftar.');
}

const isValidPassword = await bcrypt.compare(data.password!, user.password);
if (!isValidPassword) {
  throw new ValidationError('Password salah.');
}

const userWithValidRole: User = {
  ...user,
  role: user.role as "admin" | "user",
};

const token = generateToken(userWithValidRole);
return { token, user };

}

export default loginService;