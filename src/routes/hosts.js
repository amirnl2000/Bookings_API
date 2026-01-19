import express from "express";

import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import createHost from "../services/hosts/createHost.js";
import { requireAuth } from "../middleware/auth.js";



const router = express.Router();



// GET /hosts?name=...
router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const hosts = await getHosts(name);
    res.status(200).json(hosts);
  } catch (err) {
    next(err);
  }
});


// GET /hosts/:id
router.get("/:id", async (req, res, next) => {
  try {
    const host = await getHostById(req.params.id);
    if (!host) return res.status(404).json({ message: "Host not found" });
    res.status(200).json(host);
  } catch (err) {
    next(err);
  }
});

// PUT /hosts/:id
router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const updated = await updateHostById(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});


// POST /hosts
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, pictureUrl, aboutMe } = req.body;

    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
      aboutMe
    );

    res.status(201).json(newHost);
  } catch (err) {
    next(err);
  }
});



// DELETE /hosts/:id
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    await deleteHostById(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (err) {
    next(err);
  }
});



export default router;
