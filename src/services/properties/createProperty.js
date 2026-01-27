import { prisma } from "../../utils/prisma.js";

export default async function createProperty(
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating,
  hostId
) {
  return prisma.property.create({
    data: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      hostId
    },
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
      hostId: true
    }
  });
}
