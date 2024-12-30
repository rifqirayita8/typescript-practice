import bcrypt from 'bcrypt';
import {createUser} from '../../repositories/auth/authRepository.js';
import { findUserByEmail } from '../../repositories/auth/authRepository.js';
import { ValidationError } from '../../utils/customError.js';

  const register= async (data:{username: string; email: string; password: string}) => {
    const userExist= await findUserByEmail(data.email);
    if (userExist) {
      throw new ValidationError("Email sudah terdaftar.");
    }

    const hashedPassword= await bcrypt.hash(data.password, 10);
    data.password= hashedPassword;

    const user= await createUser(data);
    return user;
  }

export default register;