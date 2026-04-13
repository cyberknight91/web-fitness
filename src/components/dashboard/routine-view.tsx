"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const dayNames = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

type RoutineData = {
  id: string; name: string; description: string | null;
  days: { id: string; dayOfWeek: number; exercises: { id: string; sets: number; reps: string; restSeconds: number | null; notes: string | null; order: number; exercise: { id: string; name: string; muscleGroup: string; videoUrl: string | null; }; }[]; }[];
};

export function RoutineView({ routine, userId }: { routine: RoutineData; userId: string }) {
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;
  const defaultDay = routine.days.find((d) => d.dayOfWeek === todayIndex) ? todayIndex.toString() : routine.days[0]?.dayOfWeek.toString() ?? "0";

  const [logDialog, setLogDialog] = useState<{ exerciseId: string; exerciseName: string } | null>(null);
  const [logData, setLogData] = useState({ sets: "", reps: "", weight: "" });
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  async function handleLog() {
    if (!logDialog) return;
    try {
      const res = await fetch("/api/workout-log", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exerciseId: logDialog.exerciseId, sets: parseInt(logData.sets), reps: parseInt(logData.reps), weight: logData.weight ? parseFloat(logData.weight) : null }) });
      if (!res.ok) throw new Error();
      setCompletedExercises((prev) => new Set(prev).add(logDialog.exerciseId));
      setLogDialog(null); setLogData({ sets: "", reps: "", weight: "" });
      toast.success("Entrenamiento registrado!");
    } catch { toast.error("Error al registrar"); }
  }

  return (
    <>
      <Tabs defaultValue={defaultDay} className="mt-4">
        <TabsList className="flex flex-wrap h-auto gap-1">
          {routine.days.map((day) => (
            <TabsTrigger key={day.dayOfWeek} value={day.dayOfWeek.toString()} className="text-xs sm:text-sm">
              {dayNames[day.dayOfWeek].slice(0, 3)}
              {day.dayOfWeek === todayIndex && <span className="ml-1 text-primary">*</span>}
            </TabsTrigger>
          ))}
        </TabsList>

        {routine.days.map((day) => {
          const completed = day.exercises.filter((e) => completedExercises.has(e.exercise.id)).length;
          const total = day.exercises.length;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
          return (
            <TabsContent key={day.dayOfWeek} value={day.dayOfWeek.toString()}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold">{dayNames[day.dayOfWeek]}</h3>
                <Badge variant={pct === 100 ? "default" : "secondary"}>{completed}/{total} completados ({pct}%)</Badge>
              </div>
              <div className="space-y-3">
                {day.exercises.map((ex) => {
                  const done = completedExercises.has(ex.exercise.id);
                  return (
                    <Card key={ex.id} className={done ? "opacity-60" : ""}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          {done && <CheckCircle className="h-5 w-5 text-primary" />}
                          <div>
                            <p className="font-medium">{ex.exercise.name}</p>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                              <span>{ex.sets} series x {ex.reps} reps</span>
                              {ex.restSeconds && <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {ex.restSeconds}s descanso</span>}
                              <Badge variant="outline" className="text-xs">{ex.exercise.muscleGroup}</Badge>
                            </div>
                            {ex.notes && <p className="mt-1 text-xs text-muted-foreground">{ex.notes}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {ex.exercise.videoUrl && (
                            <a href={ex.exercise.videoUrl} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon"><ExternalLink className="h-4 w-4" /></Button>
                            </a>
                          )}
                          {!done && (
                            <Button size="sm" variant="outline" onClick={() => setLogDialog({ exerciseId: ex.exercise.id, exerciseName: ex.exercise.name })}>
                              Registrar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      <Dialog open={!!logDialog} onOpenChange={() => setLogDialog(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Registrar: {logDialog?.exerciseName}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Series Completadas</Label><Input type="number" value={logData.sets} onChange={(e) => setLogData({ ...logData, sets: e.target.value })} /></div>
            <div><Label>Repeticiones</Label><Input type="number" value={logData.reps} onChange={(e) => setLogData({ ...logData, reps: e.target.value })} /></div>
            <div><Label>Peso (kg, opcional)</Label><Input type="number" step="0.5" value={logData.weight} onChange={(e) => setLogData({ ...logData, weight: e.target.value })} /></div>
            <Button onClick={handleLog} className="w-full">Guardar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
