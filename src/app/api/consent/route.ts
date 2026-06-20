import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ConsentType = {
  PHOTO: "PHOTO",
  VIDEO: "VIDEO",
  LIKENESS: "LIKENESS",
  BIO_DATA: "BIO_DATA",
  SOCIAL_MEDIA: "SOCIAL_MEDIA",
  OTHER: "OTHER",
} as const;

const createSchema = z.object({
  type: z.enum(["PHOTO", "VIDEO", "LIKENESS", "BIO_DATA", "SOCIAL_MEDIA", "OTHER"]),
  description: z.string().min(1).max(2000),
  grantedTo: z.string().max(500).optional().nullable(),
});

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

  try {
    const body = await req.json();
    const { type, description, grantedTo } = createSchema.parse(body);

    const record = await prisma.consentRecord.create({
      data: { profileId: profile.id, type, description, grantedTo: grantedTo || null },
    });

    return NextResponse.json({ record }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 });
    }
    console.error("Consent error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}