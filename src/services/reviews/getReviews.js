import { prisma } from "../../utils/prisma.js";

export default async function getReviews(id, userId) {
  const where = {};
  if (userId) where.userId = userId;
if (id) where.id = id;
  return prisma.review.findMany({ where,
     select: {
      id: true,
      userId: true,
      propertyId: true,
      rating: true,
      comment: true,

    },
  });
}
