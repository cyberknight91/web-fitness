import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { progressLogSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = progressLogSchema.parse(body);

    const log = await prisma.progressLog.create({
      data: {
        userId: session.user.id,
        weight: data.weight ?? null,
        chest: data.chest ?? null,
        waist: data.waist ?? null,
        hips: data.hips ?? null,
        leftArm: data.leftArm ?? null,
        rightArm: data.rightArm ?? null,
        leftLeg: data.leftLeg ?? null,
        rightLeg: data.rightLeg ?? null,
        notes: data.notes ?? null,
        photoFront: body.photoFront ?? null,
        photoSide: body.photoSide ?? null,
        photoBack: body.photoBack ?? null,
      },
    });

    return NextResponse.json(log);
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 400 });
  }
}
