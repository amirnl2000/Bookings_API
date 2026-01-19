import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js";

export default async function deleteUserById(id) {
  const existing = await prisma.user.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw new NotFoundError("User", id);
  }

  await prisma.booking.deleteMany({ where: { userId: id } });
  await prisma.review.deleteMany({ where: { userId: id } });

  await prisma.user.delete({ where: { id } });

  return id;
}
