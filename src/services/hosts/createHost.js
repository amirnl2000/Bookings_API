import { prisma } from "../../utils/prisma.js";

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
