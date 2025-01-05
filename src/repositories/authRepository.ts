import prisma from "../models/prismaClient.js";
import { User } from "../models/user.js";

export const createUser= async (data: User) => {
  return await prisma.user.create({
    data: {
      username: data.username!,
      email: data.email!,
      password: data.password!,
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