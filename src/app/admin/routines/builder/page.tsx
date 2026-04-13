export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { RoutineBuilder } from "@/components/admin/routine-builder";

export default async function RoutineBuilderPage() {
  const [exercises, clients] = await Promise.all([
    prisma.exercise.findMany({ orderBy: { muscleGroup: "asc" } }),
    prisma.user.findMany({
      where: { role: "CLIENT" },
      select: { id: true, name: true, email: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Crear Rutina</h1>
      <p className="mt-1 text-muted-foreground">Crea una nueva rutina de entrenamiento</p>
      <RoutineBuilder exercises={exercises} clients={clients} />
    </div>
  );
}
