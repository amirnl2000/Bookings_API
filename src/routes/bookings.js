import express from "express";

import getBookings from "../services/bookings/getBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import createBooking from "../services/bookings/createBooking.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /bookings?userId=...
router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;
    const bookings = await getBookings(userId);
    res.status(200).json(bookings);
  } catch (err) {
    next(err); // this will trigger your global error handler
  }
});

// GET /bookings/:bookingId
router.get("/:bookingId", async (req, res, next) => {
  try {
    const booking = await getBookingById(req.params.bookingId);
    if (!booking) return res.status(404).json({ code: "NOT_FOUND", message: "Booking not found" });
    res.status(200).json(booking);
  } catch (err) {
    next(err); // this will trigger your global error handler
  }
});

// POST /bookings
router.post("/", requireAuth, async (req, res, next) => {

  try {
    const created = await createBooking(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err); // this will trigger your global error handler
  }
});

// PUT /bookings/:bookingId
router.put("/:bookingId", requireAuth, async (req, res, next) => {
  try {
    const updated = await updateBookingById(req.params.bookingId, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err); // this will trigger your global error handler
  }
});

// DELETE /bookings/:bookingId
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  try {
    await deleteBookingById(req.params.bookingId);
    res.status(200).json({ success: true });
  } catch (err) {
    next(err); // this will trigger your global error handler
  }
});

export default router;
