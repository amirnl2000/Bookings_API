import { prisma } from "../../utils/prisma.js";

export default async function createUser(...args) {
  // Accept both styles:
  // createUser(req.body)  (object)
  // createUser(username, password, name, email, phoneNumber, pictureUrl) (positional)
  let data = null;

  if (args.length === 1 && args[0] && typeof args[0] === "object" && !Array.isArray(args[0])) {
    data = args[0];
  } else {
    const [username, password, name, email, phoneNumber, pictureUrl] = args;
    data = { username, password, name, email, phoneNumber, pictureUrl };
  }

  const payload = {
    username: typeof data.username === "string" ? data.username.trim() : data.username,
    password: data.password,
    name: data.name,
    email: typeof data.email === "string" ? data.email.trim() : data.email,
    phoneNumber: data.phoneNumber,
    pictureUrl: data.pictureUrl,
  };

  return prisma.user.create({
    data: payload,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
    },
  });
}
