import { readAllUser } from "../../repositories/userManagementRepository.js";

const readAllUserService= async (page:number, limit: number) => {
  const users= await readAllUser(page, limit);
  return users;
}

export default readAllUserService;