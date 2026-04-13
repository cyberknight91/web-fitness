export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { MealPlanBuilder } from "@/components/admin/meal-plan-builder";

export default async function MealPlanBuilderPage() {
  const clients = await prisma.user.findMany({
    where: { role: "CLIENT" },
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Crear Plan Nutricional</h1>
      <p className="mt-1 text-muted-foreground">Crea un nuevo plan de nutricion</p>
      <MealPlanBuilder clients={clients} />
    </div>
  );
}
