import express from "express";

import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /reviews
router.get("/", async (req, res, next) => {
  try {
    
    const { id, userId } = req.query;
    const reviews = await getReviews(id, userId);

    res.status(200).json(reviews);
  } catch (err) {
    next(err); // this will trigger your global error handler
  }
});

// GET /reviews/:reviewId
router.get("/:reviewId", async (req, res, next) => {
  try {
    const review = await getReviewById(req.params.reviewId);
    if (!review) return res.status(404).json({ code: "NOT_FOUND", message: "Review not found" });
    res.status(200).json(review);
  } catch (err) {
    next(err); // this will trigger your global error handler
  }
});

// POST /reviews
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      rating,
      comment
    } = req.body;

    const newReview = await createReview(
      userId,
      propertyId,
      rating,
      comment
    );

    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
});


// PUT /reviews/:reviewId
router.put("/:reviewId", requireAuth, async (req, res, next) => {
  try {
    const updated = await updateReviewById(req.params.reviewId, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err); // this will trigger your global error handler
  }
});

// DELETE /reviews/:reviewId
router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  try {
    await deleteReviewById(req.params.reviewId);
    res.status(200).json({ success: true });

  } catch (err) {
    next(err); // this will trigger your global error handler
  }
});

export default router;