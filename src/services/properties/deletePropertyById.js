import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js"; 

export default async function deletePropertyById(id) {
  const existing = await prisma.property.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw new NotFoundError("Property", id);
  }

  await prisma.property.delete({
    where: { id },
  });

  return id;
}



