import { prisma } from "../../utils/prisma.js";

export default async function createReview(
      userId,
      propertyId,
      rating,
      comment,
) {
  return prisma.review.create({
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
    select: {
      id: true,
      userId: true,
      propertyId: true,
      rating: true,
      comment: true,
    },
  });
}
