export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

export default async function RoutinesPage() {
  const routines = await prisma.routine.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      days: { include: { exercises: true } },
      assignments: { include: { user: { select: { name: true } } } },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Rutinas</h1>
          <p className="mt-1 text-muted-foreground">{routines.length} rutinas creadas</p>
        </div>
        <Button asChild>
          <Link href="/admin/routines/builder">
            <Plus className="mr-2 h-4 w-4" /> Nueva Rutina
          </Link>
        </Button>
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Dias</TableHead>
                <TableHead>Total Ejercicios</TableHead>
                <TableHead>Asignado A</TableHead>
                <TableHead>Creado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routines.map((routine) => {
                const totalExercises = routine.days.reduce(
                  (acc, day) => acc + day.exercises.length,
                  0
                );
                const activeAssignments = routine.assignments.filter((a) => a.active);
                return (
                  <TableRow key={routine.id}>
                    <TableCell className="font-medium">{routine.name}</TableCell>
                    <TableCell>{routine.days.length} days</TableCell>
                    <TableCell>{totalExercises}</TableCell>
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
                      {routine.createdAt.toLocaleDateString()}
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
