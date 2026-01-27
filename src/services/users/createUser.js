import { prisma } from "../../utils/prisma.js";

export default async function createUser(data) {
  const { username, password, name, email, phoneNumber, pictureUrl } = data;

  return prisma.user.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
    },
  });
}
