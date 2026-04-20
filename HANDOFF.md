# KaziCast Project Handoff 🎬

This document provides a comprehensive overview of the **KaziCast** platform, summarizing the work completed and outlining the current state of the project.

## Project Overview
**KaziCast** is a scalable, dual-sided casting and aggregation market built exclusively for the East African film industry. The platform connects visionary directors with exceptional talent through a premium, high-performance web interface.

---

## Technical Stack
- **Frontend**: Next.js (App Router) with Tailwind CSS v4.
- **Backend**: NestJS (Monorepo structure).
- **ORM**: Prisma.
- **Database**: PostgreSQL (Designed for Neon.tech / Supabase).
- **Architecture**: Strict monochrome design (Black & White) with premium typography and micro-animations.

---

## Completed Features

### 1. Global Design System
- **Strict Monochrome Theme**: Implemented a global CSS variables-based theme for a sharp, enterprise-grade look.
- **Responsive Layout**: Sticky headers, blurred backdrop navigation, and structured footers.

### 2. Main Hero & Landing Page
- **Impactful Hero Section**: Large, bold typography with high-contrast call-to-action buttons.
- **Status Marquee**: A dynamic section showcasing platform stats (e.g., Active Castings, Verified Actors).
- **Value Proposition**: Dedicated sections for Directors and Talent.

### 3. Active Castings Directory
- **Filterable Grid**: A dedicated `/castings` page with a sidebar for role type and location filtering.
- **Casting Cards**: Hover-responsive cards with clear role details, location, and payment status.
- **Mock Data Integration**: Pre-populated with representative casting calls for the East African market.

### 4. Talent Roster & Profiles
- **Talent Discovery**: A `/talent` page listing professional profiles in a modern grid.
- **Individual Profile Pages**: Detailed `/talent/[id]` views featuring:
  - Masonry-style headshot galleries.
  - Physical attributes (Height, Build, Skills).
  - Showreel/Video integration placeholders.
  - Contact/Agent interaction buttons.

---

## Next Steps

### 1. Backend Integration
- Replace current `mockData` constants in the frontend components with API calls to the NestJS backend.
- Finish the Prisma schema design to align with the dual-sided market (Talent vs. Producers).

### 2. Authentication
- Implement NextAuth.js (Auth.js) flows for secure user registration and login.
- Define role-based access control (RBAC) for "Talent" and "Producer" user types.

### 3. Media Uploads
- Configure Cloudflare R2 or AWS S3 for hosting high-resolution headshots and showreels.

---

## Development Commands

### Start Frontend
```bash
cd frontend
npm run dev
```

### Start Backend
```bash
cd backend
npm run start:dev
```

---

*Handed off with ❤️ by the development team.*
