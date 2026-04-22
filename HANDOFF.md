# KaziCast Project Handoff 🎬 — MVP Edition

This document provides a comprehensive overview of the **KaziCast Landing Page MVP**, summarizing the work completed for the pre-funding demo phase.

## Project Overview
**KaziCast** is a premium, high-performance landing page designed to communicate the product vision for an East African film casting platform and capture waitlist sign-ups. The current scope focuses on visual credibility and lead generation with zero backend requirements.

---

## Technical Stack
- **Frontend**: Next.js (App Router) with Tailwind CSS v4.
- **Design System**: Strict monochrome (Black & White) with a film-amber accent (`#C8A97E`).
- **Typography**: `Cormorant Garamond` (Serif/Display) and `Syne` (Sans/UI).
- **Icons**: Phosphor Icons (via `lucide-react` or SVG).
- **Form Capture**: Client-side logic ready for Google Forms POST integration.

---

## Completed Features

### 1. High-Fidelity Landing Page
- **Refined Hero Section**: Balanced typography with a focused problem statement and primary CTA.
- **Problem & Solution**: Narrative sections addressing the "WhatsApp casting" gap in East Africa.
- **Dual-Sided Value Props**: Separate panels detailing the benefits for Talent and Directors.
- **Market Stats**: Visualized data points on the regional creative economy to build credibility.
- **How It Works**: A minimalist 3-step guide to the future platform workflow.

### 2. Waitlist System
- **Interactive Form Box**: Simplified UI with a "Spot Available" placeholder that transitions to a success state.
- **Dynamic Feedback**: Scale and fade animations for the "You're on the list" confirmation message.
- **Zero-Backend Logic**: Built to submit directly to Google Forms entry points.

---

## Next Steps (Post-Funding)

### 1. Platform Infrastructure
- Initialize the NestJS backend monorepo.
- Configure PostgreSQL/Prisma for talent and casting schemas.

### 2. Authentication & Profiles
- Implement Auth.js for secure onboarding.
- Build the profile builder for talent to upload headshots and showreels.

### 3. Casting Directory
- Transition the static landing page components into dynamic dashboards.

---

## Development Commands

### Start Landing Page
```bash
cd frontend
npm run dev
```

---

*Handed off with ❤️ for the East African Creative Scene.*
