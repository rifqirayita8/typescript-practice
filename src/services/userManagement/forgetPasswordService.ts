import { forgetPassword } from "../../repositories/userManagementRepository.js";
import bcrypt from 'bcrypt';
import { forgetPasswordValidation } from "../../validations/userManagement/forgetPasswordValidation.js";

const forgetPasswordService= async(email:string, password: string) => {
  forgetPasswordValidation({email, password});
  const hashedPassword= await bcrypt.hash(password, 10);
  password= hashedPassword;

  const data= await forgetPassword(email, password);
  return data;
}

export default forgetPasswordService;