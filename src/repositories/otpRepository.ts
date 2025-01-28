import prisma from "../config/prismaClient.js";

export const createOtp= async (email:string, otp: string, expiresAt: Date) => {
  return prisma.oTP.create({
    data: {
      email,
      otp,
      expiresAt,
    }
  })
}

export const findOtp= async (email:string) => {
  return prisma.oTP.findFirst({
    where: {email},
    orderBy: {createdAt: 'desc'}
  })
}

export const deleteOtp= async (email:string) => {
  return prisma.oTP.deleteMany({
    where: {email}
  })
}