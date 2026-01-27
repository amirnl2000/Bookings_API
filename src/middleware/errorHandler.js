// Default export: NotFoundError
export default class NotFoundError extends Error {
  constructor(message = "Not found") {
    super(message);
    this.statusCode = 404;
  }
}
import * as Sentry from "@sentry/node";
import { Prisma } from "@prisma/client";

// Named export: errorHandler middleware
export const errorHandler = (err, req, res, next) => {
  // Validation errors are client errors – return 400
  if (err?.name === "PrismaClientValidationError") {
    return res.status(400).json({ message: "Bad request" });
  }
  // P2025 means the record doesn’t exist – return 404
  if (err?.code === "P2025") {
    return res.status(404).json({ message: "Not found" });
  }

  // record already exist
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
  return res.status(409).json({
    message: "Conflict: already exists"
  });
}


  // Your custom errors (like NotFoundError) will have a statusCode
  if (err?.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  
  // Everything else is an internal server error
  console.error(err);
  Sentry.captureException(err);

  return res.status(500).json({ message: "Internal server error" });
  
};
