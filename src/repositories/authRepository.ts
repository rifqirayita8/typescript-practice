import prisma from "../models/prismaClient.js";
import { User } from "../models/user.js";
import { sendWelcomeEmail } from "../utils/emailHelper.js";

export const createUser= async (data: User) => {
  const newUser= await prisma.user.create({
    data: {
      username: data.username!,
      email: data.email!,
      password: data.password!,
      role: data.role
    }
  });
  await sendWelcomeEmail(newUser.email, newUser.username);
  return newUser;
}

export const findUserByEmail= async (email:string) => {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  })
}