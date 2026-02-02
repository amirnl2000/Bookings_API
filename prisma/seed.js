import { PrismaClient } from "@prisma/client";
import fs from "node:fs/promises";
import path from "node:path";

const prisma = new PrismaClient();

const readJson = async (filename) => {
  const p = path.join(process.cwd(), "src", "data", filename);
  const raw = await fs.readFile(p, "utf8");
  return JSON.parse(raw);
};

const main = async () => {
  const usersData = await readJson("users.json");
  const hostsData = await readJson("hosts.json");
  const propertiesData = await readJson("properties.json");
  const bookingsData = await readJson("bookings.json");
  const reviewsData = await readJson("reviews.json");
  const amenitiesData = await readJson("amenities.json");

  const users = usersData.users;
  const hosts = hostsData.hosts;
  const properties = propertiesData.properties;
  const amenities = amenitiesData.amenities;

  const bookings = bookingsData.bookings.map((b) => ({
    ...b,
    checkinDate: new Date(b.checkinDate),
    checkoutDate: new Date(b.checkoutDate),
  }));

  const reviews = reviewsData.reviews;

  await prisma.booking.deleteMany();
  await prisma.review.deleteMany();
  await prisma.property.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.host.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({ data: users });
  await prisma.host.createMany({ data: hosts });
  await prisma.amenity.createMany({ data: amenities });
  await prisma.property.createMany({ data: properties });

  const amenityConnect = amenities.map((a) => ({ id: a.id }));
  for (const p of properties) {
    await prisma.property.update({
      where: { id: p.id },
      data: { amenities: { connect: amenityConnect } },
    });
  }

  await prisma.booking.createMany({ data: bookings });
  await prisma.review.createMany({ data: reviews });
};

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
