import prisma from "../config/prismaClient.js";
import { findUserByEmail } from "./authRepository.js";

export const readAllUser= async(page:number, limit:number) => {
  return await prisma.user.findMany({
    take: limit,
    skip: (page-1)*limit,
  })
}

export const findUserbyId= async(id:number) => {
  return await prisma.user.findUnique({
    where: {
      id: id
    }
  })
}

export const updateUser= async(id: number, data:{username:string, email:string, password:string}) => {
  const user= await findUserbyId(id);
  if (!user) {
    return null;
  }
  
  return await prisma.user.update({
    where: {id: id},
    data: {
      username: data.username,
      email: data.email,
      password: data.password
    }
  })
}

export const forgetPassword= async(email:string, password: string) => {
  const user= await findUserByEmail(email);
  if (!user) {
    throw new Error('User tidak ditemukan');
  }
  
  return prisma.user.update({
    where: {email},
    data: {password}
  })
}

export const deleteUser= async(id:number) => {

  return await prisma.user.delete({
    where: {
      id: id
    },
  })
}