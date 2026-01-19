import express from "express";
import usersRouter from "./routes/users.js";
import bookingsRouter from "./routes/bookings.js";
import hostsRouter from "./routes/hosts.js";
import propertyRouter from "./routes/properties.js";
import reviewRouter from "./routes/reviews.js";
import loginRouter from "./routes/login.js";
import * as Sentry from "@sentry/node";
import dotenv from "dotenv";
dotenv.config();

// Import the default NotFoundError class and the named errorHandler function
import NotFoundError, { errorHandler } from "./middleware/errorHandler.js";


const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

app.use(Sentry.Handlers.requestHandler());
app.use(express.json());

app.use((req, res, next) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const ms = Number(process.hrtime.bigint() - start) / 1_000_000;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms.toFixed(1)}ms`);
  });

  next();
});


// routes
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/bookings", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertyRouter);
app.use("/reviews", reviewRouter);


// error handling
app.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);


app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
