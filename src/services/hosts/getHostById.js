import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js";

export default async function getHostById(id) {
  const host = await prisma.host.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
      aboutMe: true
    }
  });

  if (!host) {
    throw new NotFoundError("Host not found");
  }

  return host;
}
