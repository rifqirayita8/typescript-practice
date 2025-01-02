import bcrypt from "bcrypt";
import { User } from "../../models/user.js";
import { findUserByEmail } from "../../repositories/auth/authRepository.js";
import { loginValidation } from "../../validations/auth/loginValidation.js";
import { NotFoundError, ValidationError } from "../../utils/customError.js";
import { generateToken } from "../../utils/jwtHelper.js";

const loginService= async (data: {email: string, password: string}) => {
  
  loginValidation(data);

  const user= await findUserByEmail(data.email);
  if (!user) {
    throw new NotFoundError('Email belum terdaftar.');
  }

  const isValidPassowrd= await bcrypt.compare(data.password, user.password);
  if (!isValidPassowrd) {
    throw new ValidationError('Password salah.');
  }

  const token= generateToken(user);
  return {token, user};
}

export default loginService;