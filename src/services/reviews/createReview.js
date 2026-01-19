import { prisma } from "../../utils/prisma.js";
import { v4 as uuidv4 } from "uuid";

export default async function createReview(
      userId,
      propertyId,
      rating,
      comment,
) {
  return prisma.review.create({
    data: {
      id: uuidv4(), // The schema has String @id without @default(uuid())
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
