import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role !== "TALENT") {
    return NextResponse.json({ error: "Only talent can apply." }, { status: 403 });
  }

  const { id: castingId } = await params;
  const { message } = await req.json().catch(() => ({ message: "" }));

  const casting = await prisma.casting.findUnique({ where: { id: castingId } });
  if (!casting || casting.status !== "OPEN") {
    return NextResponse.json({ error: "Casting not found or closed." }, { status: 404 });
  }

  try {
    const application = await prisma.application.create({
      data: { castingId, talentId: session.user.id, message: message || null },
    });
    return NextResponse.json({ application }, { status: 201 });
  } catch (e: any) {
    if (e?.code === "P2002") {
      return NextResponse.json({ error: "Already applied." }, { status: 409 });
    }
    throw e;
  }
}
