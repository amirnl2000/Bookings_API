import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js"; 

export default async function updateUserById(id, data) {
  const existing = await prisma.user.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw new NotFoundError("User", id);
  }

  // Optional: remove undefined fields so you only update what was provided
  Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);

  return prisma.user.update({
    where: { id },
    data,
  });
}
