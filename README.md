# Bookings API (Winc Academy Final Project)

This repo contains my final project for Back End Development with JavaScript at Winc Academy.

I built the API myself (routes, Prisma services, auth, validation, error handling).
I used ChatGPT as a study helper to understand errors, debug failing tests, and improve things step by step.
Final choices and changes were made by me, and verified by running the provided Postman and Newman tests locally.

## What this API does

A simple booking platform API with:
* Users
* Hosts
* Properties
* Bookings
* Reviews
* Amenities

Protected routes require:
`Authorization: Bearer <token>`

## Status codes (important behavior)

* 200 OK  
  Successful GET, PUT, DELETE (where applicable)

* 201 Created  
  Successful POST

* 400 Bad Request  
  Validation errors or invalid input

* 401 Unauthorized  
  Missing or invalid token on protected routes

* 404 Not Found  
  * Unknown route
  * Resource by ID does not exist
  * Filtered list endpoint returns nothing (example: `/users?username=Notfound`)

* 409 Conflict  
  Creating a User or Host that already exists (duplicate username or email)

## Project structure (high level)

* `src/`
  * `index.js` Express entry point, routers, 404, global error handler
  * `routes/` Route definitions per resource
  * `services/` Prisma queries and business logic per resource
  * `middleware/` JWT auth middleware and global error handler
  * `utils/prisma.js` Shared Prisma client
  * `data/` Seed JSON used by `prisma/seed.js`

* `prisma/`
  * `schema.prisma` Prisma schema (SQLite)
  * `seed.js` Seeds the database from `src/data`

* `postman/`
  * `collections/` Newman test collections (positive + negative)
  * `environments/` Postman environments

Full file map:
* `docs/file-map.txt`

## Setup (local)

### Requirements
* Node.js 18+  
* npm

### Install
From the project root:

```powershell
npm install
````

### Environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./prisma/dev.db"
AUTH_SECRET_KEY="dev-secret"
SENTRY_DSN=""
NODE_ENV=development
SENTRY_ENVIRONMENT=development
```

Notes:

* `SENTRY_DSN` can be empty for local development.
* SQLite DB file is `prisma/dev.db`.

### Database setup

First time:

```powershell
npx prisma db push
npx prisma db seed
```

Full reset (recommended before running tests):

```powershell
npx prisma db push --force-reset
npx prisma db seed
```

### Start the server

```powershell
npm run dev
```

Server runs at:
`http://localhost:3000`

## Postman and Newman tests

Collections:

* `postman/collections/Bookings API.json`
* `postman/collections/Bookings API Negative.json`

Environment:

* `postman/environments/Local.postman_environment.json`

Make sure:

* `baseURL` is `localhost`
* Do not include `http://`
* Do not include the port (the collection already adds `:3000`)

### Run all tests

Terminal 1 (keep running):

```powershell
npm run dev
```

Terminal 2:

```powershell
npm test
```

Expected:

* Positive: 0 failed
* Negative: 0 failed

Full sample output:

* `docs/test-output.txt`

### Rerunning tests

Some tests create and delete data.
If you rerun tests and things look weird, reset and reseed first:

```powershell
npx prisma db push --force-reset
npx prisma db seed
```
