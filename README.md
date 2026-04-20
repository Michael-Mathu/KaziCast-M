# KaziCast Casting & Aggregator Platform 🎬

A scalable, dual-sided casting and aggregation market built exclusively for the East African film industry.

## Tech Stack Overview
In order to comply with the project requirement of an enterprise-grade infrastructure utilizing exclusively **zero-budget** tiers for deployment, development, and testing, the stack employs the following structure:

### Frontend: Next.js (App Router)
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js (Auth.js) - *Free, decoupled, runs on our own database*
- **Hosting**: Vercel - *Free Hobby Tier (Serverless compute, edge network)*

### Backend: NestJS
- **Framework**: Node.js via NestJS
- **ORM**: Prisma
- **Hosting**: Render / Railway - *Free Tiers (Dockerized web service container spinning down during inactivity)*

### Database: PostgreSQL
- **Database Engine**: PostgreSQL
- **Hosting Provider**: Neon.tech / Supabase - *Free Tier (Generous compute and pooled database connections ideal for Prisma and Serverless)*

### Media Storage
- AWS S3 or Cloudflare R2 - *Cloudflare R2 provides a generous free tier for bandwidth, avoiding AWS egress costs for media-heavy headshots/showreels.*

## Development Guide

### 1. Frontend Setup
```bash
cd frontend
npm run dev
```
Navigate to `http://localhost:3000`. The interface utilizes strict white/black monochrome styling per standard development constraints.

### 2. Backend Setup
```bash
cd backend
npm run start:dev
```
The Nest API currently runs on `http://localhost:3000` (or `3001` to avoid collision).

### Prisma Initialization
Configure your Neon/Supabase URL into `backend/.env`.
```bash
cd backend
npx prisma db push
npx prisma generate
```
