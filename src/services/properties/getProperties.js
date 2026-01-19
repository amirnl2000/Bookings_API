import { prisma } from "../../utils/prisma.js";

export default async function getProperties(location, pricePerNight) {
  const where = {};

  if (location) where.location = location;

  if (pricePerNight !== undefined) {
    where.pricePerNight = Number(pricePerNight);
  }

  return prisma.property.findMany({
    where,
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      pricePerNight: true,
      bedroomCount: true,
      bathRoomCount: true,
      maxGuestCount: true,
      rating: true,
      hostId: true,
    },
  });
}
