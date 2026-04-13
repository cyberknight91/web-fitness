export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Target, Ruler, Weight } from "lucide-react";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await prisma.user.findUnique({
    where: { id, role: "CLIENT" },
    include: {
      routines: {
        include: { routine: true },
        orderBy: { startDate: "desc" },
      },
      mealPlans: {
        include: { mealPlan: true },
        orderBy: { startDate: "desc" },
      },
      progressLogs: {
        orderBy: { loggedAt: "desc" },
        take: 10,
      },
    },
  });

  if (!client) notFound();

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/admin/clients">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Clientes
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{client.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {client.email}
            </div>
            {client.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {client.phone}
              </div>
            )}
            {client.goal && (
              <div className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-muted-foreground" />
                <Badge variant="secondary" className="capitalize">{client.goal}</Badge>
              </div>
            )}
            {client.height && (
              <div className="flex items-center gap-2 text-sm">
                <Ruler className="h-4 w-4 text-muted-foreground" />
                {client.height} cm
              </div>
            )}
            {client.weight && (
              <div className="flex items-center gap-2 text-sm">
                <Weight className="h-4 w-4 text-muted-foreground" />
                {client.weight} kg
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Registrado el {client.createdAt.toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {/* Assigned Routines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rutinas Asignadas</CardTitle>
            </CardHeader>
            <CardContent>
              {client.routines.length === 0 ? (
                <p className="text-sm text-muted-foreground">No routines assigned.</p>
              ) : (
                <div className="space-y-2">
                  {client.routines.map((ar) => (
                    <div key={ar.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">{ar.routine.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {ar.startDate.toLocaleDateString()} - {ar.endDate?.toLocaleDateString() ?? "En curso"}
                        </p>
                      </div>
                      <Badge variant={ar.active ? "default" : "secondary"}>
                        {ar.active ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assigned Meal Plans */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Planes Asignados</CardTitle>
            </CardHeader>
            <CardContent>
              {client.mealPlans.length === 0 ? (
                <p className="text-sm text-muted-foreground">No meal plans assigned.</p>
              ) : (
                <div className="space-y-2">
                  {client.mealPlans.map((amp) => (
                    <div key={amp.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">{amp.mealPlan.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {amp.startDate.toLocaleDateString()} - {amp.endDate?.toLocaleDateString() ?? "En curso"}
                        </p>
                      </div>
                      <Badge variant={amp.active ? "default" : "secondary"}>
                        {amp.active ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progreso Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              {client.progressLogs.length === 0 ? (
                <p className="text-sm text-muted-foreground">No progress logs yet.</p>
              ) : (
                <div className="space-y-2">
                  {client.progressLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm">
                        {log.loggedAt.toLocaleDateString()}
                      </span>
                      <div className="flex gap-3 text-sm">
                        {log.weight && <span>Weight: {log.weight}kg</span>}
                        {log.waist && <span>Waist: {log.waist}cm</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
