import express from "express";

import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /users?username=...&email=...
router.get("/", async (req, res, next) => {
  try {
    const { username, email } = req.query;
    const users = await getUsers(username, email);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});


// GET /users/:id
router.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

// POST /users
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});




// PUT /users/:id
router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const updated = await updateUserById(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /users/:id
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    await deleteUserById(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (err) {
    next(err);
  }
});

export default router;
