export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Dumbbell, Utensils, MessageSquare, TrendingUp, Activity } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [clientCount, routineCount, mealPlanCount, unreadMessages, recentLogs, recentClients] =
    await Promise.all([
      prisma.user.count({ where: { role: "CLIENT" } }),
      prisma.routine.count(),
      prisma.mealPlan.count(),
      prisma.message.count({
        where: {
          toUser: { role: "ADMIN" },
          read: false,
        },
      }),
      prisma.progressLog.findMany({
        take: 5,
        orderBy: { loggedAt: "desc" },
        include: { user: { select: { name: true } } },
      }),
      prisma.user.findMany({
        where: { role: "CLIENT" },
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, email: true, createdAt: true, goal: true },
      }),
    ]);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Panel de Administracion</h1>
      <p className="mt-1 text-muted-foreground">Resumen de tu negocio fitness</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{clientCount}</p>
              <p className="text-xs text-muted-foreground">Total Clientes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{routineCount}</p>
              <p className="text-xs text-muted-foreground">Rutinas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Utensils className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mealPlanCount}</p>
              <p className="text-xs text-muted-foreground">Planes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{unreadMessages}</p>
              <p className="text-xs text-muted-foreground">Mensajes Sin Leer</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-4 w-4" /> Clientes Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentClients.length === 0 ? (
              <p className="text-sm text-muted-foreground">No clients yet.</p>
            ) : (
              <div className="space-y-3">
                {recentClients.map((client) => (
                  <Link
                    key={client.id}
                    href={`/admin/clients/${client.id}`}
                    className="flex items-center justify-between rounded-lg border border-border/40 p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.email}</p>
                    </div>
                    <span className="text-xs text-muted-foreground capitalize">{client.goal || "Sin objetivo"}</span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-4 w-4" /> Progreso Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentLogs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No progress logs yet.</p>
            ) : (
              <div className="space-y-3">
                {recentLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between rounded-lg border border-border/40 p-3">
                    <div>
                      <p className="font-medium">{log.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.loggedAt.toLocaleDateString()}
                      </p>
                    </div>
                    {log.weight && <span className="font-semibold">{log.weight} kg</span>}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
