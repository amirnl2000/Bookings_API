import { prisma } from "../../utils/prisma.js";
import { v4 as uuidv4 } from "uuid";

export default async function createUser(data) {
  const { username, password, name, email, phoneNumber, pictureUrl } = data;

  return prisma.user.create({
    data: {
      id: uuidv4(),
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
    },
  });
}
