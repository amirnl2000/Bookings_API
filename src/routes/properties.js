import express from "express";

import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /properties
router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight } = req.query;

    const properties = await getProperties(location, pricePerNight);
    res.status(200).json(properties);
  } catch (err) {
    next(err); // this will trigger your global error handler
  }
});



// GET /properties/:Property:Id
router.get("/:propertyId", async (req, res, next) => {
  try {
    const property = await getPropertyById(req.params.propertyId);
    if (!property) return res.status(404).json({ code: "NOT_FOUND", message: "Property not found" });
    res.status(200).json(property);
  } catch (err) {
    next(err); // this will trigger your global error handler
  }
});



// POST /properties
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      hostId
    } = req.body;

    const newProperty = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      hostId
    );

    res.status(201).json(newProperty);
  } catch (err) {
    next(err);
  }
});



// PUT /properties/:propertyId
router.put("/:propertyId", requireAuth, async (req, res, next) => {
  try {
    const updated = await updatePropertyById(req.params.propertyId, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err); // this will trigger your global error handler
  }
});


// DELETE /properties/:propertyId
router.delete("/:propertyId", requireAuth, async (req, res, next) => {
  try {
    await deletePropertyById(req.params.propertyId);
    res.status(200).json({ success: true });

  } catch (err) {
    next(err); // this will trigger your global error handler
  }
});



export default router;