import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, description, days, clientIds } = body;

    const routine = await prisma.routine.create({
      data: {
        name,
        description: description || null,
        days: {
          create: days.map((day: { dayOfWeek: number; exercises: Array<{ exerciseId: string; sets: number; reps: string; restSeconds: number; notes: string; order: number }> }) => ({
            dayOfWeek: day.dayOfWeek,
            exercises: {
              create: day.exercises.map((ex) => ({
                exerciseId: ex.exerciseId,
                sets: ex.sets,
                reps: ex.reps,
                restSeconds: ex.restSeconds || null,
                notes: ex.notes || null,
                order: ex.order,
              })),
            },
          })),
        },
      },
    });

    // Assign to selected clients
    if (clientIds && clientIds.length > 0) {
      await prisma.assignedRoutine.createMany({
        data: clientIds.map((userId: string) => ({
          userId,
          routineId: routine.id,
          startDate: new Date(),
          active: true,
        })),
      });
    }

    return NextResponse.json(routine);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create" }, { status: 400 });
  }
}
