import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js";

export default async function getHosts(name) {
  const where = {};

  if (name !== undefined && name !== null && String(name).trim() !== "") {
    where.name = String(name);
  }

  const hosts = await prisma.host.findMany({
    where,
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

  const hasFilter = Object.keys(where).length > 0;

  if (hasFilter && hosts.length === 0) {
    throw new NotFoundError("Host not found");
  }

  return hosts;
}
