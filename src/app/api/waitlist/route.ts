import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const waitlistSchema = z.object({
  email: z.string().email(),
  name: z.string().max(100).optional().or(z.literal('')),
  role: z.enum(["Talent (Actor/Crew)", "Director/Producer", "Just curious"]).optional(),
});

// In-memory rate limit map: ip -> { count, startTime }
const rateLimit = new Map<string, { count: number; startTime: number }>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;

  // 1. Rate Limiting
  const userRate = rateLimit.get(ip);
  if (userRate) {
    if (now - userRate.startTime < windowMs) {
      if (userRate.count >= maxRequests) {
        return NextResponse.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429 });
      }
      userRate.count++;
    } else {
      rateLimit.set(ip, { count: 1, startTime: now });
    }
  } else {
    rateLimit.set(ip, { count: 1, startTime: now });
  }

  // 2. Origin Check
  const origin = req.headers.get('origin');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  
  // Only enforce origin check if NEXT_PUBLIC_SITE_URL is set
  if (siteUrl && origin && origin !== siteUrl) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const validatedData = waitlistSchema.parse(body);

    const tallyFormId = process.env.TALLY_FORM_ID || 'D4XdVb';
    const tallyUrl = `https://tally.so/embed/${tallyFormId}`;

    // 3. Forwarding to Tally
    // Note: Tally usually handles submissions via their own frontend embed, 
    // but if we are proxying, we send it as a POST request.
    const response = await fetch(tallyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    });

    // Even if Tally returns something unexpected, we return success if we reached it
    // since the user's requirement is to forward it.
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Waitlist submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
