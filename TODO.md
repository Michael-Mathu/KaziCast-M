# TODO: Future Improvements

## Database Migration (PostgreSQL)
- [ ] Revert `prisma/schema.prisma` to PostgreSQL provider
- [ ] Restore native enums (`Role`, `ConsentType`, `ConsentStatus`, `CastingStatus`, `ApplicationStatus`)
- [ ] Change `skills` back to `String[]` (native array type)
- [ ] Restore `@db.Text` annotations for long text fields
- [ ] Set up Neon.tech or other PostgreSQL instance
- [ ] Update `.env` with production `DATABASE_URL`
- [ ] Run `npx prisma db push` to migrate schema
- [ ] Re-seed database for production

## Code Cleanup
- [ ] Remove SQLite-specific JSON parsing for skills (back to native array)
- [ ] Simplify error handling in API routes (enums will be validated by Prisma)
- [ ] Add proper logging service instead of console.error (optional)

## Notes
SQLite was used temporarily to enable local testing without external database setup. Production deployment should use PostgreSQL as specified in `implementation_plan.md`.