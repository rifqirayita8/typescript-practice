import prisma from "../config/prismaClient.js";
import { University } from "../models/university.js";
import { UniversityMajor } from "../models/university.js";

export const createUniversity= async (data: University) => {
  const newUniversity= await prisma.universitas.create({
    data: {
      nama: data.name,
      lokasi: data.location,
      akreditasi: data.accreditation,
    }
  })
  return newUniversity;
}

export const createUniversityMajor= async (data: UniversityMajor) => {
  const newUniversityMajor= await prisma.jurusan.create({
    data: {
      nama: data.name
    }
  })
  return newUniversityMajor;
}