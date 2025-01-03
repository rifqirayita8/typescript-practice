import prisma from "../models/prismaClient.js";

export const readAllUser= async(page:number, limit:number) => {
  return await prisma.user.findMany({
    take: limit,
    skip: (page-1)*limit,
  })
}