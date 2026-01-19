import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js"; 

export default async function updateBookingById(id, data) {
  const existing = await prisma.booking.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw new NotFoundError("Booking", id);
  }

  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  );

  return prisma.booking.update({
    where: { id },
    data: cleanData,
    select: {
      id: true,
      userId: true,
      propertyId: true,
      checkinDate: true,
      checkoutDate: true,
      numberOfGuests: true,
      totalPrice: true,
      bookingStatus: true,
    },
  });
}
