import { updateUser } from "../../repositories/userManagementRepository.js";
import bcrypt from 'bcrypt';

const updateUserService= async(id:number, data:{username:string, email:string, password:string}) => {

  if(data.password) {
    const hashedPassword= await bcrypt.hash(data.password, 10);
    data.password= hashedPassword;
  }

  const user= await updateUser(id, data);
  return user;
}

export default updateUserService;