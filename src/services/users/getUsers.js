import { prisma } from "../../utils/prisma.js";

export default async function getUsers(username, email) {
  const where = {};
  if (username) where.username = username;
  if (email) where.email = email;

  return prisma.user.findMany({
    where,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
    },
  });
}
