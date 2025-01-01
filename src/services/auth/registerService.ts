import bcrypt from 'bcrypt';
import {createUser} from '../../repositories/auth/authRepository.js';
import { registerValidation } from '../../validations/auth/registerValidation.js';

  const register= async (data:{username: string; email: string; password: string}) => {

      registerValidation(data);
  
      const hashedPassword= await bcrypt.hash(data.password, 10);
      data.password= hashedPassword;
  
      const user= await createUser(data);
      return user;
    }

export default register;