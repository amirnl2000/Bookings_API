import { prisma } from "../../utils/prisma.js";

export default async function createBooking({
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus,
}) {
  return prisma.booking.create({
    data: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
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

