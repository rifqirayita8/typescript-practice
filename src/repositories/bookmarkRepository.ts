import prisma from "../config/prismaClient.js";

export const createBookmark= async(userId: number, universityId: number) => {
  return await prisma.bookmark.create({
    data: {
      userId: userId,
      universitasId: universityId
    }
  })
}

export const deleteBookmark= async(userId: number, universityId: number) => {
  return await prisma.bookmark.delete({
    where: {
      userId_universitasId: {
        userId: userId,
        universitasId: universityId
      }
    }
  })
}

export const getBookmark= async(userId: number) => {
  return await prisma.bookmark.findMany({
    where: { userId }
  });
}

export const isBookmarked= async(userId: number, universityId: number) => {
  return await prisma.bookmark.findUnique({
    where: {
      userId_universitasId: {
        userId: userId,
        universitasId: universityId
      }
    }
  })
}