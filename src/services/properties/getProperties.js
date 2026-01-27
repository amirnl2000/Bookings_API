import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js";

export default async function getProperties(location, pricePerNight) {
  const where = {};

  if (location !== undefined && location !== null && String(location).trim() !== "") {
    where.location = String(location);
  }

  if (pricePerNight !== undefined && pricePerNight !== null && String(pricePerNight).trim() !== "") {
    const price = Number(pricePerNight);
    if (!Number.isNaN(price)) {
      where.pricePerNight = price;
    }
  }

  const properties = await prisma.property.findMany({
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
      hostId: true
    }
  });

  const hasFilter = Object.keys(where).length > 0;

  if (hasFilter && properties.length === 0) {
    throw new NotFoundError("Property not found");
  }

  return properties;
}
