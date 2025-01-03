import prisma from "../models/prismaClient.js";

export const createUser= async (data: {username: string; email: string; password: string, role: string}) => {
  return await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role
    }
  });
}

export const findUserByEmail= async (email:string) => {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  })
}

//https://vavada-bns2.top/#vs-e808991177665