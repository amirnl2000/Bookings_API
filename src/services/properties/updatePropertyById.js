import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js"; 

export default async function updatePropertyById(id, data) {
  const existing = await prisma.property.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw new NotFoundError("Property", id);
  }

  // Optional: remove undefined fields so you only update what was provided
  Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);

  return prisma.property.update({
    where: { id },
    data,
  });
}
