import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ConsentType } from "@prisma/client";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const profile = await prisma.talentProfile.findUnique({ where: { userId: session.user.id } });
  if (!profile) return NextResponse.json({ consents: [] });

  const consents = await prisma.consentRecord.findMany({
    where: { profileId: profile.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ consents });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const profile = await prisma.talentProfile.findUnique({ where: { userId: session.user.id } });
  if (!profile) return NextResponse.json({ error: "Profile not found." }, { status: 404 });

  const { type, description, grantedTo } = await req.json();

  if (!Object.values(ConsentType).includes(type)) {
    return NextResponse.json({ error: "Invalid consent type." }, { status: 400 });
  }

  const record = await prisma.consentRecord.create({
    data: { profileId: profile.id, type, description, grantedTo: grantedTo || null },
  });

  return NextResponse.json({ record }, { status: 201 });
}
