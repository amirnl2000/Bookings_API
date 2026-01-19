import { prisma } from "../../utils/prisma.js";

export default async function getHosts(name) {
  const where = {};
  if (name) where.name = name;

  return prisma.host.findMany({
    where,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
      aboutMe: true,
    },
  });
}
