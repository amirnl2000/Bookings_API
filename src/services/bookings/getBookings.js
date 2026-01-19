import { prisma } from "../../utils/prisma.js";

export default async function getBookings(id, userId) {
  const where = {};
  if (userId) where.userId = userId;
if (id) where.id = id;
  return prisma.booking.findMany({ where,
     select: {
  id: true,
  userId: true,
  propertyId: true,
  checkinDate: true,
  checkoutDate: true,
  numberOfGuests: true,
  totalPrice : true,
  bookingStatus : true
    },
  });
}

