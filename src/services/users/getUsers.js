import { prisma } from "../../utils/prisma.js";
import NotFoundError from "../../middleware/errorHandler.js";

export default async function getUsers(username, email) {
  const where = {};

  if (username !== undefined && username !== null && String(username).trim() !== "") {
    where.username = String(username);
  }

  if (email !== undefined && email !== null && String(email).trim() !== "") {
    where.email = String(email);
  }

  const users = await prisma.user.findMany({
    where,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true
    }
  });

  const hasFilter = Object.keys(where).length > 0;

  if (hasFilter && users.length === 0) {
    throw new NotFoundError("User not found");
  }

  return users;
}
