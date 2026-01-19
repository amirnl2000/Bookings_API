# BED Final Project - Amir Darzi - Bookings_API

This repository contains the final project for Back End Development with JavaScript by Winc Academy.

I built the API myself (routes, Prisma services, auth, validation, error handling).
I used ChatGPT as a study helper to understand errors, debug failing tests, and improve my implementation step by step.
All final code decisions and changes were made by me, and I verified them by running the provided Postman and Newman tests locally.

## Project structure (high level)

- src/
  - index.js: Express app entry, mounts routers, 404, error handling
  - routes/: Route definitions per resource
  - services/: Prisma queries and business logic per resource
  Services pattern
                    - src/services/<resource>/
                      - create<Resource>.js
                      - get<Resource>s.js
                      - get<Resource>ById.js
                      - update<Resource>ById.js
                      - delete<Resource>ById.js

  - middleware/: JWT auth middleware and global error handler
  - utils/prisma.js: Shared Prisma client
  - data/: Seed JSON used by prisma/seed.js
- prisma/
  - schema.prisma: Prisma schema
  - seed.js: Reset and seed database from src/data JSON
- postman/
  - collections/: Newman test collections (positive and negative)
  - environments/: Postman environments

Full file map:
- docs/file-map.txt

## Postman and automated tests (Newman)

Collections
- postman/collections/Bookings API.json
- postman/collections/Bookings API Negative.json

Environment
- postman/environments/Local.postman_environment.json
  baseURL should be: localhost

## Endpoints (from Postman collection)
Protected routes require:
Authorization: Bearer <token>

Auth
- POST /login

Users
- GET /users
- GET /users?username=...
- GET /users?email=...
- GET /users/:userId
- POST /users (protected)
- PUT /users/:userId (protected)
- DELETE /users/:userId (protected)

Hosts
- GET /hosts
- GET /hosts?name=...
- GET /hosts/:hostId
- POST /hosts (protected)
- PUT /hosts/:hostId (protected)
- DELETE /hosts/:hostId (protected)

Properties
- GET /properties
- GET /properties?location=...
- GET /properties?pricePerNight=...
- GET /properties?location=...&pricePerNight=...
- GET /properties/:propertyId
- POST /properties (protected)
- PUT /properties/:propertyId (protected)
- DELETE /properties/:propertyId (protected)

Bookings
- GET /bookings
- GET /bookings?userId=...
- GET /bookings/:bookingId
- POST /bookings (protected)
- PUT /bookings/:bookingId (protected)
- DELETE /bookings/:bookingId (protected)

Reviews
- GET /reviews
- GET /reviews/:reviewId
- POST /reviews (protected)
- PUT /reviews/:reviewId (protected)
- DELETE /reviews/:reviewId (protected)

## How to get started

### Requirements
- Node.js 18 or newer
- npm
- Git

### Install
From the project root:

```bash
npm install
````

### Environment variables

Create a .env file in the project root:

```env
DATABASE_URL="file:./prisma/dev.db"
AUTH_SECRET_KEY="dev-secret"
SENTRY_DSN=""
NODE_ENV=development
SENTRY_ENVIRONMENT=development
```

Notes

* SENTRY_DSN can be empty for local development.
* This project uses SQLite via Prisma (prisma/dev.db).

### Database setup (first time)

Create the database and seed initial data:

```bash
npx prisma db push
npx prisma db seed
```

Full reset (recommended before re running tests):

```bash
npx prisma db push --force-reset
npx prisma db seed
```

### Start the server

```bash
npm run dev
```

Server runs at:

* [http://localhost:3000](http://localhost:3000)

### Postman environment (important)

Use:

* postman/environments/Local.postman_environment.json

Make sure:

* baseURL value is: localhost

Important rules:

* Do not include http://
* Do not include the port
  The collection already adds http:// and :3000.

## Running tests (Postman Newman)

### Recommended flow

Terminal 1 (keep running):

```bash
npm run dev
```

Terminal 2:

```bash
npm test
```

Expected results:

* Positive: 33 requests, 0 failed
* Negative: 44 requests, 0 failed

Full sample output:

* docs/test-output.txt

### If you rerun tests

Some tests delete data. Before re running tests, reset and reseed:

```bash
npx prisma db push --force-reset
npx prisma db seed
```

### Run collections individually (optional)

```bash
npm run test-positive
npm run test-negative
```

## Scripts (quick reference)

* npm run dev: start the API with nodemon
* npm test: run positive and negative Newman collections
* npm run test-positive: run positive collection only
* npm run test-negative: run negative collection only

## Notes about Sentry

Sentry is optional for local development.

If you temporarily added a /debug-sentry test route, keep it commented out or remove it before deploying.

```
