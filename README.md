ProdLaunch — Full-stack example (Express + SQLite)
----------------------------------------------------

This example provides a minimal production-adjacent stack you can run locally.

Files included:
- package.json
- server.js           (Express static + API)
- db.js               (SQLite helper)
- init_db.js          (run `npm run init-db` to create table)
- public/index.html   (landing page frontend)
- public/style.css
- data.sqlite         (created after init)

How to run locally:
1. Install Node.js (>=14)
2. In project folder, run:
   npm install
   npm run init-db
   npm start
3. Open http://localhost:3000

Notes:
- The /api/leads endpoint stores leads in a local SQLite file (data.sqlite).
- In production you should: add authentication for admin endpoints, use HTTPS, sanitize inputs,
  use a hosted DB (Postgres/MySQL) and proper environment configuration.
