import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const logSchema = z.object({
  exerciseId: z.string(),
  sets: z.number().int().positive(),
  reps: z.number().int().positive(),
  weight: z.number().positive().nullable().optional(),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = logSchema.parse(body);

    await prisma.workoutLog.create({
      data: {
        userId: session.user.id,
        exerciseId: data.exerciseId,
        sets: data.sets,
        reps: data.reps,
        weight: data.weight ?? null,
        notes: data.notes ?? null,
      },
    });

    return NextResponse.json({ message: "Logged" });
  } catch {
    return NextResponse.json({ error: "Failed to log" }, { status: 400 });
  }
}
