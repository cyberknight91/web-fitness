export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

export default async function MealPlansPage() {
  const mealPlans = await prisma.mealPlan.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      meals: true,
      assignments: { include: { user: { select: { name: true } } } },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Planes Nutricionales</h1>
          <p className="mt-1 text-muted-foreground">{mealPlans.length} planes creados</p>
        </div>
        <Button asChild>
          <Link href="/admin/meal-plans/builder">
            <Plus className="mr-2 h-4 w-4" /> Nuevo Plan
          </Link>
        </Button>
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Comidas</TableHead>
                <TableHead>Calorias Totales</TableHead>
                <TableHead>Asignado A</TableHead>
                <TableHead>Creado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mealPlans.map((plan) => {
                const totalCal = plan.meals.reduce((acc, m) => acc + (m.calories || 0), 0);
                const activeAssignments = plan.assignments.filter((a) => a.active);
                return (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>{plan.meals.length}</TableCell>
                    <TableCell>{totalCal} kcal</TableCell>
                    <TableCell>
                      {activeAssignments.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {activeAssignments.map((a) => (
                            <Badge key={a.id} variant="secondary" className="text-xs">
                              {a.user.name}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Sin asignar</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {plan.createdAt.toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
