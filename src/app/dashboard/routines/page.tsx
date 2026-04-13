export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { RoutineView } from "@/components/dashboard/routine-view";

export default async function RoutinesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const assigned = await prisma.assignedRoutine.findFirst({
    where: { userId: session.user.id, active: true },
    include: {
      routine: {
        include: {
          days: {
            orderBy: { dayOfWeek: "asc" },
            include: {
              exercises: {
                orderBy: { order: "asc" },
                include: { exercise: true },
              },
            },
          },
        },
      },
    },
  });

  if (!assigned) {
    return (
      <div>
        <h1 className="font-heading text-2xl font-bold">Mis Rutinas</h1>
        <p className="mt-4 text-muted-foreground">
          Aun no tienes rutina asignada. Tu entrenador creara y asignara una para ti.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Mis Rutinas</h1>
      <p className="mt-1 text-muted-foreground">{assigned.routine.name}</p>
      <RoutineView routine={assigned.routine} userId={session.user.id} />
    </div>
  );
}
