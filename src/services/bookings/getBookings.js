import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js";

export default async function getBookings(id, userId) {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (id) {
    where.id = id;
  }

  const bookings = await prisma.booking.findMany({
    where,
    select: {
      id: true,
      userId: true,
      propertyId: true,
      checkinDate: true,
      checkoutDate: true,
      numberOfGuests: true,
      totalPrice: true,
      bookingStatus: true
    }
  });

  const hasFilter = Object.keys(where).length > 0;

  if (hasFilter && bookings.length === 0) {
    throw new NotFoundError("No bookings found");
  }

  return bookings;
}
