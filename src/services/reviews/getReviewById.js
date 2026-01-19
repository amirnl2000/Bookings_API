import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js";

export default async function getReviewById(id) {
  const review = await prisma.review.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      propertyId: true,
      rating: true,
      comment: true,
    },
  });
  if (!review) {
    throw new NotFoundError("Review not found");
  }
  return review;
}
