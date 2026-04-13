export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MealPlanView } from "@/components/dashboard/meal-plan-view";

export default async function MealPlanPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const assigned = await prisma.assignedMealPlan.findFirst({
    where: { userId: session.user.id, active: true },
    include: {
      mealPlan: {
        include: {
          meals: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!assigned) {
    return (
      <div>
        <h1 className="font-heading text-2xl font-bold">Mi Plan Nutricional</h1>
        <p className="mt-4 text-muted-foreground">
          Aun no tienes plan nutricional asignado. Tu entrenador creara uno para ti.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Mi Plan Nutricional</h1>
      <p className="mt-1 text-muted-foreground">{assigned.mealPlan.name}</p>
      <MealPlanView mealPlan={assigned.mealPlan} />
    </div>
  );
}
