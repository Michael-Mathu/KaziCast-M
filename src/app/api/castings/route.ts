import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(20),
  roleType: z.string(),
  gender: z.string().optional(),
  ageRange: z.string().optional(),
  location: z.string().min(2),
  productionType: z.string(),
  rate: z.string(),
  rateAmount: z.string().optional(),
  deadline: z.string().refine((d) => new Date(d) > new Date(), { message: "Deadline must be in the future." }),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "DIRECTOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const casting = await prisma.casting.create({
      data: {
        ...data,
        deadline: new Date(data.deadline),
        directorId: session.user.id,
      },
    });

    return NextResponse.json({ casting }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 });
    }
    console.error("Create casting error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
