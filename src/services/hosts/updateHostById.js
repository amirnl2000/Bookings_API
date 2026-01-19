import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js"; 

export default async function updateHostById(id, data) {
  const existing = await prisma.host.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw new NotFoundError("Host", id);
  }

  // Optional: remove undefined fields so you only update what was provided
  Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);

  return prisma.host.update({
    where: { id },
    data,
  });
}
