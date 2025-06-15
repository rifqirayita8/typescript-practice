import prisma from "../config/prismaClient.js"

export async function findAllUniversitas() {
  return prisma.universitas.findMany({
    select: {
      name: true,
      tuition_fee: true,
      accreditation: true,
      pass_percentage: true,
      latitude: true,
      longitude: true,
      major_count: true,
      acceptanceRate: true,
    },
  });
}