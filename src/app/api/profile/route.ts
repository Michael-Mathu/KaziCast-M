import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  stageName: z.string().max(100).optional().nullable(),
  bio: z.string().max(2000).optional().nullable(),
  headshotUrl: z.string().url().max(500).optional().nullable(),
  location: z.string().max(200).optional().nullable(),
  gender: z.string().max(50).optional().nullable(),
  ageRange: z.string().max(50).optional().nullable(),
  skills: z.array(z.string().max(100)).max(50).optional(),
  previousWorks: z.string().max(5000).optional().nullable(),
  portfolioUrls: z.string().max(5000).optional().nullable(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const profile = await prisma.talentProfile.findUnique({
    where: { userId: session.user.id },
  });

  return NextResponse.json({ profile });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const data = updateSchema.parse(body);

    const profile = await prisma.talentProfile.upsert({
      where: { userId: session.user.id },
      update: {
        stageName: data.stageName ?? null,
        bio: data.bio ?? null,
        headshotUrl: data.headshotUrl ?? null,
        location: data.location ?? null,
        gender: data.gender ?? null,
        ageRange: data.ageRange ?? null,
        skills: JSON.stringify(data.skills || []),
        previousWorks: data.previousWorks ?? null,
        portfolioUrls: data.portfolioUrls ?? null,
      },
      create: {
        userId: session.user.id,
        stageName: data.stageName ?? null,
        bio: data.bio ?? null,
        headshotUrl: data.headshotUrl ?? null,
        location: data.location ?? null,
        gender: data.gender ?? null,
        ageRange: data.ageRange ?? null,
        skills: JSON.stringify(data.skills || []),
        previousWorks: data.previousWorks ?? null,
        portfolioUrls: data.portfolioUrls ?? null,
      },
    });

    return NextResponse.json({ profile });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 });
    }
    console.error("Profile update error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}