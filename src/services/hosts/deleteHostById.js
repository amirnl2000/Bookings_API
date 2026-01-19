import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js";

export default async function deleteHostById(id) {
  const existing = await prisma.host.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw new NotFoundError("Host", id);
  }

  const props = await prisma.property.findMany({
    where: { hostId: id },
    select: { id: true },
  });

  const propertyIds = props.map(p => p.id);

  if (propertyIds.length) {
    await prisma.booking.deleteMany({ where: { propertyId: { in: propertyIds } } });
    await prisma.review.deleteMany({ where: { propertyId: { in: propertyIds } } });
  }

  await prisma.property.deleteMany({ where: { hostId: id } });
  await prisma.host.delete({ where: { id } });

  return id;
}
