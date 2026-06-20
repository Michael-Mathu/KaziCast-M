# KaziCast — Implementation Plan (Path A + B)

**Scope:** Verified talent registry with AI consent ledger + real casting marketplace
**Stack:** Next.js (App Router) · PostgreSQL (Neon free tier) · Prisma · NextAuth.js · Tailwind v4
**Hosting:** Vercel free tier
**Timeline:** ~4 phases, each delivers something usable

---

## Phase 1 — Database + Auth Foundation (Week 1)

Get real users into a real database. Everything else builds on this.

### Infrastructure

- **PostgreSQL:** [Neon.tech](https://neon.tech) free tier — 0.5GB storage, always-on, generous compute. No credit card needed.
- Set `DATABASE_URL` in `.env` (gitignored)

### Prisma Schema

#### [NEW] `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  TALENT
  DIRECTOR
}

model User {
  id           String    @id @default(cuid())
  email        String    @unique
  passwordHash String
  name         String
  role         Role      @default(TALENT)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  profile      TalentProfile?
  castings     Casting[]
  applications Application[]
}
```

> [!NOTE]
> Full schema shown below in Phase 2/3. Prisma migrations are additive — we add models as we need them, not all at once.

### Auth Wiring

#### [NEW] `src/lib/prisma.ts`
Singleton Prisma client (standard Next.js pattern to avoid hot-reload connection leaks).

#### [NEW] `src/lib/auth.ts`
NextAuth config — credentials provider that hashes with `bcrypt`, stores in Postgres via Prisma. No OAuth for now (saves complexity; add Google later if needed).

#### [MODIFY] `src/app/login/page.tsx`
Already exists — just needs to point at the real NextAuth endpoint (mostly already does).

#### [NEW] `src/app/register/page.tsx`
Registration form: name, email, password, role picker (Talent / Director). Calls a server action that hashes password + creates user.

#### [NEW] `src/app/api/auth/[...nextauth]/route.ts`
NextAuth API route handler.

### New Dependencies

```
prisma (dev), @prisma/client, bcrypt, @types/bcrypt (dev)
```

> [!IMPORTANT]
> No ORMs on top of Prisma, no extra auth libraries. NextAuth + Prisma + bcrypt is the entire backend. Keep it boring.

---

## Phase 2 — Talent Profiles + Consent Ledger (Week 2)

This is the **Path A differentiator**. Every profile gets a public consent record.

### Schema Additions

```prisma
model TalentProfile {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  stageName   String?
  bio         String?  @db.Text
  headshotUrl String?
  location    String?
  gender      String?
  ageRange    String?
  skills      String[]

  verified    Boolean  @default(false)
  consents    ConsentRecord[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum ConsentType {
  LIKENESS_USE
  AI_TRAINING_OPTOUT
  SHOWREEL_PUBLIC
}

enum ConsentStatus {
  ACTIVE
  REVOKED
}

model ConsentRecord {
  id          String        @id @default(cuid())
  profileId   String
  profile     TalentProfile @relation(fields: [profileId], references: [id], onDelete: Cascade)

  type        ConsentType
  description String
  grantedTo   String?
  status      ConsentStatus @default(ACTIVE)

  createdAt   DateTime  @default(now())
  revokedAt   DateTime?
}
```

### Pages & Components

#### [NEW] `src/app/dashboard/page.tsx`
Role-based redirect: Talent → profile editor, Director → my castings. Simple `getServerSession()` check.

#### [NEW] `src/app/dashboard/profile/page.tsx`
Talent profile editor. Form fields: stage name, bio, location, gender, age range, skills (multi-select). Headshot upload (stored as URL — use free Cloudinary or just a URL input for MVP).

#### [NEW] `src/app/dashboard/consent/page.tsx`
Consent management. Shows current consent records. Big toggle: **"I do NOT consent to AI training on my likeness"** (creates an `AI_TRAINING_OPTOUT` record with timestamp). Add specific production consents.

#### [MODIFY] `src/app/talent/page.tsx`
Replace mock data with real Prisma query. Keep the existing UI — it's good.

#### [MODIFY] `src/app/talent/[id]/page.tsx`
Real profile page from DB. Add a **public consent section** at the bottom: "This artist's consent record" — shows timestamped opt-outs and production-specific consents. This is the killer feature.

### Headshot Storage (Free Tier)

For MVP: accept a URL input (actors paste their headshot link from Google Drive, Instagram, etc.). No file upload infra needed.

Later upgrade: Cloudinary free tier (25GB) or Vercel Blob (limited free).

> [!TIP]
> The consent ledger is *public by design*. It's not hidden behind auth. Anyone — including AI companies — can see that an actor has opted out. This is the point.

---

## Phase 3 — Real Castings Marketplace (Week 3)

Wire up the castings flow with real data.

### Schema Additions

```prisma
enum CastingStatus {
  OPEN
  CLOSED
  FILLED
}

model Casting {
  id             String        @id @default(cuid())
  directorId     String
  director       User          @relation(fields: [directorId], references: [id])

  title          String
  description    String        @db.Text
  roleType       String
  gender         String?
  ageRange       String?
  location       String
  productionType String
  rate           String
  rateAmount     String?

  deadline       DateTime
  status         CastingStatus @default(OPEN)
  applications   Application[]

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

enum ApplicationStatus {
  PENDING
  SHORTLISTED
  REJECTED
  ACCEPTED
}

model Application {
  id        String            @id @default(cuid())
  castingId String
  casting   Casting           @relation(fields: [castingId], references: [id], onDelete: Cascade)
  talentId  String
  talent    User              @relation(fields: [talentId], references: [id])

  message   String?           @db.Text
  status    ApplicationStatus @default(PENDING)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([castingId, talentId])
}
```

### Pages

#### [NEW] `src/app/dashboard/castings/new/page.tsx`
Director-only form: title, description, role type, gender, age range, location, production type, rate, deadline. Server action creates casting in DB.

#### [NEW] `src/app/dashboard/castings/page.tsx`
Director's "My Castings" list with application counts.

#### [MODIFY] `src/app/castings/page.tsx`
Replace mock data with Prisma query. Wire up the existing filter UI (checkboxes → query params → `where` clause). Keep the existing card design.

#### [MODIFY] `src/app/castings/[id]/page.tsx`
Real casting detail. Add "Apply" button (visible to logged-in Talent). Application form: optional cover message. One-click if profile is complete.

#### [NEW] `src/app/dashboard/castings/[id]/applications/page.tsx`
Director view: list of applicants for a casting. Click to view profile. Shortlist/Reject buttons.

#### [NEW] `src/app/dashboard/applications/page.tsx`
Talent view: "My Applications" — status of each application (Pending, Shortlisted, etc.).

---

## Phase 4 — Polish & Launch Prep (Week 4)

#### [MODIFY] `src/components/Header.tsx`
Conditional nav: logged out → "Login / Register" buttons. Logged in → "Dashboard" + role-specific links + logout.

#### [MODIFY] Landing page
Update waitlist CTA to "Join Now" → links to `/register`. The waitlist era is over once you have real auth.

#### [NEW] `src/middleware.ts`
Protect `/dashboard/*` routes — redirect to `/login` if no session. ~10 lines.

#### SEO & Meta
- Unique `<title>` and `<meta description>` per page
- OG image for social shares (use the landing page hero aesthetic)

---

## File Structure (Final)

```
prisma/
  schema.prisma
src/
  lib/
    prisma.ts              # Singleton client
    auth.ts                # NextAuth config
  app/
    page.tsx               # Landing (existing)
    login/page.tsx         # Login (existing, wired)
    register/page.tsx      # NEW: Registration
    talent/
      page.tsx             # Talent roster (real data)
      [id]/page.tsx        # Public profile + consent ledger
    castings/
      page.tsx             # Castings board (real data)
      [id]/page.tsx        # Casting detail + apply
    dashboard/
      page.tsx             # Role-based hub
      profile/page.tsx     # Talent: edit profile
      consent/page.tsx     # Talent: manage consent records
      castings/
        page.tsx           # Director: my castings
        new/page.tsx       # Director: create casting
        [id]/
          applications/page.tsx  # Director: review applicants
      applications/page.tsx     # Talent: my applications
    api/
      auth/[...nextauth]/route.ts
  components/
    Header.tsx             # Updated nav
    landing/               # Existing landing components
  middleware.ts            # Route protection
```

---

## Verification Plan

### After Each Phase
- `npx prisma db push` succeeds (schema valid)
- `npm run build` passes (no type errors)
- Manual test: register → login → create profile → post casting → apply → review

### Smoke Test Checklist
- [ ] Can register as Talent and Director
- [ ] Talent can create profile with consent opt-out
- [ ] Public profile shows consent ledger
- [ ] Director can post casting
- [ ] Talent can browse and apply to castings
- [ ] Director can see applications and shortlist
- [ ] Unauthenticated users can't access dashboard
- [ ] Landing page still works

---

## What We're NOT Building (Yet)

These are real features but premature for a solo dev with no users:

- ❌ Email notifications (add when you have 50+ users)
- ❌ File upload for headshots (URL input is fine for now)
- ❌ Payment processing (manual for now)
- ❌ AI likeness scanning (Path C — post-funding)
- ❌ Chat/messaging between talent and directors
- ❌ Admin panel
- ❌ Mobile app

> [!CAUTION]
> Resist the urge to add features before you have users using the core flow. Every feature you add before product-market fit is maintenance debt you carry alone.
