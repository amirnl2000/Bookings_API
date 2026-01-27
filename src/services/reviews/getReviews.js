import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js";

export default async function getReviews(id, userId) {
  const where = {};

  if (userId !== undefined && userId !== null && String(userId).trim() !== "") {
    where.userId = String(userId);
  }

  if (id !== undefined && id !== null && String(id).trim() !== "") {
    where.id = String(id);
  }

  const reviews = await prisma.review.findMany({
    where,
    select: {
      id: true,
      userId: true,
      propertyId: true,
      rating: true,
      comment: true
    }
  });

  const hasFilter = Object.keys(where).length > 0;

  if (hasFilter && reviews.length === 0) {
    throw new NotFoundError("Review not found");
  }

  return reviews;
}
