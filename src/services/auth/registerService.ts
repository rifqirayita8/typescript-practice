import bcrypt from 'bcrypt';
import {createUser} from '../../repositories/authRepository.js';
import { registerValidation } from '../../validations/auth/registerValidation.js';
import { User } from '../../models/user.js';

  const registerService= async (data:User) => {

      registerValidation(data);
  
      const hashedPassword= await bcrypt.hash(data.password!, 10);
      data.password= hashedPassword;
  
      const user= await createUser(data);
      return user;
    }

export default registerService;