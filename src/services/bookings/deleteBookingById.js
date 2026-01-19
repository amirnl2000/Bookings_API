import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js"; 

export default async function deleteBookingById(id) {
  const existing = await prisma.booking.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw new NotFoundError("Booking", id);
  }

  await prisma.booking.delete({
    where: { id },
  });

  return id;
}



