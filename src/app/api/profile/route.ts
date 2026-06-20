import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

  const { stageName, bio, headshotUrl, location, gender, ageRange, skills, previousWorks, portfolioUrls } = await req.json();

  const profile = await prisma.talentProfile.upsert({
    where: { userId: session.user.id },
    update: { stageName, bio, headshotUrl, location, gender, ageRange, skills: JSON.stringify(skills || []), previousWorks, portfolioUrls },
    create: { userId: session.user.id, stageName, bio, headshotUrl, location, gender, ageRange, skills: JSON.stringify(skills || []), previousWorks, portfolioUrls },
  });

  return NextResponse.json({ profile });
}
