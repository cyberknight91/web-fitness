"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
};

type Client = {
  id: string;
  name: string;
  email: string;
};

type DayExercise = {
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: string;
  restSeconds: number;
  notes: string;
};

type RoutineDay = {
  dayOfWeek: number;
  exercises: DayExercise[];
};

export function RoutineBuilder({
  exercises,
  clients,
}: {
  exercises: Exercise[];
  clients: Client[];
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState<RoutineDay[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Group exercises by muscle group
  const grouped = exercises.reduce<Record<string, Exercise[]>>((acc, ex) => {
    if (!acc[ex.muscleGroup]) acc[ex.muscleGroup] = [];
    acc[ex.muscleGroup].push(ex);
    return acc;
  }, {});

  function addDay(dayOfWeek: number) {
    if (days.find((d) => d.dayOfWeek === dayOfWeek)) return;
    setDays([...days, { dayOfWeek, exercises: [] }].sort((a, b) => a.dayOfWeek - b.dayOfWeek));
  }

  function removeDay(dayOfWeek: number) {
    setDays(days.filter((d) => d.dayOfWeek !== dayOfWeek));
  }

  function addExerciseToDay(dayOfWeek: number, exerciseId: string) {
    const ex = exercises.find((e) => e.id === exerciseId);
    if (!ex) return;
    setDays(
      days.map((d) =>
        d.dayOfWeek === dayOfWeek
          ? {
              ...d,
              exercises: [
                ...d.exercises,
                {
                  exerciseId: ex.id,
                  exerciseName: ex.name,
                  sets: 3,
                  reps: "10",
                  restSeconds: 60,
                  notes: "",
                },
              ],
            }
          : d
      )
    );
  }

  function updateExercise(dayOfWeek: number, index: number, updates: Partial<DayExercise>) {
    setDays(
      days.map((d) =>
        d.dayOfWeek === dayOfWeek
          ? {
              ...d,
              exercises: d.exercises.map((e, i) => (i === index ? { ...e, ...updates } : e)),
            }
          : d
      )
    );
  }

  function removeExercise(dayOfWeek: number, index: number) {
    setDays(
      days.map((d) =>
        d.dayOfWeek === dayOfWeek
          ? { ...d, exercises: d.exercises.filter((_, i) => i !== index) }
          : d
      )
    );
  }

  async function handleSubmit() {
    if (!name.trim()) {
      toast.error("Please enter a routine name");
      return;
    }
    if (days.length === 0) {
      toast.error("Please add at least one day");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/routines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          days: days.map((d) => ({
            dayOfWeek: d.dayOfWeek,
            exercises: d.exercises.map((e, i) => ({
              exerciseId: e.exerciseId,
              sets: e.sets,
              reps: e.reps,
              restSeconds: e.restSeconds,
              notes: e.notes,
              order: i,
            })),
          })),
          clientIds: selectedClients,
        }),
      });

      if (!res.ok) throw new Error();
      toast.success("Routine created!");
      router.push("/admin/routines");
    } catch {
      toast.error("Failed to create routine");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-6">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
              step === s
                ? "bg-primary text-primary-foreground"
                : step > s
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Detalles de Rutina</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Nombre de Rutina *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Hypertrophy 4-Day Split" />
            </div>
            <div>
              <Label>Descripcion</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the routine..." />
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!name.trim()}>
                Siguiente <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Build Days */}
      {step === 2 && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agregar Dias de Entrenamiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {dayNames.map((dayName, i) => {
                  const isAdded = days.some((d) => d.dayOfWeek === i);
                  return (
                    <Button
                      key={i}
                      variant={isAdded ? "default" : "outline"}
                      size="sm"
                      onClick={() => (isAdded ? removeDay(i) : addDay(i))}
                    >
                      {dayName}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {days.map((day) => (
            <Card key={day.dayOfWeek}>
              <CardHeader>
                <CardTitle className="text-lg">{dayNames[day.dayOfWeek]}</CardTitle>
              </CardHeader>
              <CardContent>
                {day.exercises.map((ex, i) => (
                  <div key={i} className="mb-3 rounded-lg border p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{ex.exerciseName}</span>
                      <Button variant="ghost" size="icon" onClick={() => removeExercise(day.dayOfWeek, i)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>
                        <Label className="text-xs">Series</Label>
                        <Input
                          type="number"
                          value={ex.sets}
                          onChange={(e) => updateExercise(day.dayOfWeek, i, { sets: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Reps</Label>
                        <Input
                          value={ex.reps}
                          onChange={(e) => updateExercise(day.dayOfWeek, i, { reps: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Descanso (seg)</Label>
                        <Input
                          type="number"
                          value={ex.restSeconds}
                          onChange={(e) => updateExercise(day.dayOfWeek, i, { restSeconds: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Notas</Label>
                        <Input
                          value={ex.notes}
                          onChange={(e) => updateExercise(day.dayOfWeek, i, { notes: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Select onValueChange={(v) => addExerciseToDay(day.dayOfWeek, v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Agregar ejercicio..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(grouped).map(([group, exs]) => (
                      <div key={group}>
                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase">
                          {group}
                        </div>
                        {exs.map((ex) => (
                          <SelectItem key={ex.id} value={ex.id}>
                            {ex.name}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Atras
            </Button>
            <Button onClick={() => setStep(3)} disabled={days.length === 0}>
              Siguiente <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Assign to Clients */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Asignar a Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Select clients to assign this routine to. You can skip this and assign later.
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {clients.map((client) => (
                <label key={client.id} className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50">
                  <Checkbox
                    checked={selectedClients.includes(client.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedClients([...selectedClients, client.id]);
                      } else {
                        setSelectedClients(selectedClients.filter((id) => id !== client.id));
                      }
                    }}
                  />
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.email}</p>
                  </div>
                </label>
              ))}
            </div>
            {selectedClients.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {selectedClients.map((id) => {
                  const c = clients.find((cl) => cl.id === id);
                  return c ? (
                    <Badge key={id} variant="secondary">{c.name}</Badge>
                  ) : null;
                })}
              </div>
            )}
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Atras
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Creando..." : "Crear Rutina"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
