export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Utensils, TrendingUp, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      routines: { where: { active: true }, include: { routine: true } },
      mealPlans: { where: { active: true }, include: { mealPlan: true } },
      progressLogs: { orderBy: { loggedAt: "desc" }, take: 1 },
      receivedMessages: { where: { read: false }, select: { id: true } },
    },
  });
  if (!user) redirect("/login");

  const activeRoutine = user.routines[0];
  const activeMealPlan = user.mealPlans[0];
  const lastProgress = user.progressLogs[0];
  const unreadMessages = user.receivedMessages.length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold">Bienvenido, {user.name.split(" ")[0]}!</h1>
        <p className="text-muted-foreground">Tu resumen fitness</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Dumbbell className="h-5 w-5" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Rutina Activa</p>
                <p className="font-semibold">{activeRoutine ? activeRoutine.routine.name : "Sin asignar"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Utensils className="h-5 w-5" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Plan Nutricional</p>
                <p className="font-semibold">{activeMealPlan ? activeMealPlan.mealPlan.name : "Sin asignar"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><TrendingUp className="h-5 w-5" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Peso Actual</p>
                <p className="font-semibold">{lastProgress?.weight ? `${lastProgress.weight} kg` : user.weight ? `${user.weight} kg` : "Sin registrar"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Target className="h-5 w-5" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Objetivo</p>
                <p className="font-semibold capitalize">{user.goal || "Sin definir"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg">
              Entrenamiento de Hoy
              <Button asChild variant="outline" size="sm"><Link href="/dashboard/routines">Ver Todo</Link></Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeRoutine ? (
              <div>
                <Badge>{activeRoutine.routine.name}</Badge>
                <p className="mt-2 text-sm text-muted-foreground">Revisa tu pagina de rutinas para los ejercicios de hoy.</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Aun no tienes rutina asignada. Tu entrenador te asignara una.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg">
              Mensajes
              {unreadMessages > 0 && <Badge variant="destructive">{unreadMessages} nuevo{unreadMessages > 1 ? "s" : ""}</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {unreadMessages > 0 ? (
              <p className="text-sm text-muted-foreground">Tienes {unreadMessages} mensaje{unreadMessages > 1 ? "s" : ""} sin leer de tu entrenador.</p>
            ) : (
              <p className="text-sm text-muted-foreground">No hay mensajes nuevos.</p>
            )}
            <Button asChild variant="outline" size="sm" className="mt-3"><Link href="/dashboard/messages">Abrir Mensajes</Link></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
