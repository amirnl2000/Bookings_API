import { prisma } from "../../utils/prisma.js";

export default async function createHost(...args) {
  // Accept both styles:
  // createHost(req.body) (object)
  // createHost(username, password, name, email, phoneNumber, pictureUrl, aboutMe) (positional)
  let data = null;

  if (args.length === 1 && args[0] && typeof args[0] === "object" && !Array.isArray(args[0])) {
    data = args[0];
  } else {
    const [username, password, name, email, phoneNumber, pictureUrl, aboutMe] = args;
    data = { username, password, name, email, phoneNumber, pictureUrl, aboutMe };
  }

  const payload = {
    username: typeof data.username === "string" ? data.username.trim() : data.username,
    password: data.password,
    name: data.name,
    email: typeof data.email === "string" ? data.email.trim() : data.email,
    phoneNumber: data.phoneNumber,
    pictureUrl: data.pictureUrl,
    aboutMe: data.aboutMe,
  };

  return prisma.host.create({
    data: payload,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
      aboutMe: true,
    },
  });
}
