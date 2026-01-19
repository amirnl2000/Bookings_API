// src/routes/login.js
import { Router } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // basic guard
    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    // fetch user + password from DB
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true, password: true },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const secretKey = process.env.AUTH_SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ message: "AUTH_SECRET_KEY not set" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "2h" });
    return res.status(200).json({ token });
  } catch (err) {
    next(err); // this will trigger your global error handler
  }
});

export default router;
