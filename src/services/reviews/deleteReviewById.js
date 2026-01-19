import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js"; 

export default async function deleteReviewById(id) {
  const existing = await prisma.review.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw new NotFoundError("Review", id);
  }

  await prisma.review.delete({
    where: { id },
  });

  return id;
}

