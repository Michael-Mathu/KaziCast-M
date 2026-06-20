import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["PENDING", "SHORTLISTED", "REJECTED", "ACCEPTED"];

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; appId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "DIRECTOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: castingId, appId } = await params;
  const { status } = await req.json();

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  // Verify this casting belongs to this director
  const casting = await prisma.casting.findUnique({ where: { id: castingId } });
  if (!casting || casting.directorId !== session.user.id) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const application = await prisma.application.update({
    where: { id: appId },
    data: { status },
  });

  return NextResponse.json({ application });
}
