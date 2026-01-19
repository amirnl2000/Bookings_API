import { prisma } from "../../utils/prisma.js";
import { v4 as uuidv4 } from "uuid";

export default async function createHost(
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
  aboutMe
) {
  return prisma.host.create({
    data: {
      id: uuidv4(), // The schema has String @id without @default(uuid())
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
      aboutMe,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
      aboutMe: true,
      // do NOT return password
    },
  });
}
