import { deleteUser, findUserbyId } from "../../repositories/userManagementRepository.js";
import { NotFoundError } from "../../utils/customError.js";

const deleteUserService= async(id:number) => {

  const isValidUser= await findUserbyId(id);
  if (!isValidUser) {
    throw new NotFoundError("User tidak ditemukan.");
  }
  const user= await deleteUser(id);

  return user;
}

export default deleteUserService;