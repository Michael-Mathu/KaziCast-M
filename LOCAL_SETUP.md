# Local Setup Notes

This project uses PostgreSQL in production. For local development/testing, a SQLite fallback has been configured.

## Local Development (SQLite)

The `.env` file is pre-configured for SQLite:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="dev-secret-change-me"
NEXTAUTH_URL="http://localhost:3000"
```

Seed data is automatically populated when `prisma/seed.js` runs.

## Production Setup

To use PostgreSQL in production (recommended):
1. Create a PostgreSQL database (e.g., [Neon.tech](https://neon.tech) free tier)
2. Update `.env`:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
   NEXTAUTH_SECRET="your-secure-random-string"
   NEXTAUTH_URL="https://your-domain.com"
   ```
3. Run:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

## Changes Made for SQLite Compatibility

- Schema switched to SQLite provider
- Enums replaced with String fields
- `skills` field changed from `String[]` to `String` (JSON string)
- Added try/catch blocks around all Prisma queries for graceful error handling
- Added user-friendly error messages when database is unreachable