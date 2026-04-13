"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { progressLogSchema, type ProgressLogInput } from "@/lib/validations/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ProgressLogData = {
  id: string;
  weight: number | null;
  chest: number | null;
  waist: number | null;
  hips: number | null;
  leftArm: number | null;
  rightArm: number | null;
  leftLeg: number | null;
  rightLeg: number | null;
  photoFront: string | null;
  photoSide: string | null;
  photoBack: string | null;
  notes: string | null;
  loggedAt: string;
};

export function ProgressTracker({ logs }: { logs: ProgressLogData[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProgressLogInput>({
    resolver: zodResolver(progressLogSchema),
  });

  async function onSubmit(data: ProgressLogInput) {
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Progreso registrado!");
      reset();
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Error al guardar el progreso");
    }
  }

  const chartData = [...logs]
    .reverse()
    .map((log) => ({
      date: new Date(log.loggedAt).toLocaleDateString("es-ES", { month: "short", day: "numeric" }),
      weight: log.weight,
      chest: log.chest,
      waist: log.waist,
      hips: log.hips,
    }));

  return (
    <div className="mt-4">
      <div className="flex justify-end mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Registrar Progreso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Registrar Progreso</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Peso (kg)</Label>
                  <Input type="number" step="0.1" {...register("weight")} />
                </div>
                <div>
                  <Label>Pecho (cm)</Label>
                  <Input type="number" step="0.1" {...register("chest")} />
                </div>
                <div>
                  <Label>Cintura (cm)</Label>
                  <Input type="number" step="0.1" {...register("waist")} />
                </div>
                <div>
                  <Label>Caderas (cm)</Label>
                  <Input type="number" step="0.1" {...register("hips")} />
                </div>
                <div>
                  <Label>Brazo Izq (cm)</Label>
                  <Input type="number" step="0.1" {...register("leftArm")} />
                </div>
                <div>
                  <Label>Brazo Der (cm)</Label>
                  <Input type="number" step="0.1" {...register("rightArm")} />
                </div>
                <div>
                  <Label>Pierna Izq (cm)</Label>
                  <Input type="number" step="0.1" {...register("leftLeg")} />
                </div>
                <div>
                  <Label>Pierna Der (cm)</Label>
                  <Input type="number" step="0.1" {...register("rightLeg")} />
                </div>
              </div>
              <div>
                <Label>Notas</Label>
                <Textarea {...register("notes")} />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar Progreso"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="charts">
        <TabsList>
          <TabsTrigger value="charts">Graficos</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="photos">Fotos</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6 mt-4">
          {chartData.length < 2 ? (
            <p className="text-center text-muted-foreground py-8">
              Registra al menos 2 entradas para ver tus graficos de progreso.
            </p>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Peso (kg)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis fontSize={12} domain={["auto", "auto"]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Medidas (cm)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis fontSize={12} domain={["auto", "auto"]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="chest" stroke="#3b82f6" strokeWidth={2} name="Pecho" />
                      <Line type="monotone" dataKey="waist" stroke="#f59e0b" strokeWidth={2} name="Cintura" />
                      <Line type="monotone" dataKey="hips" stroke="#ef4444" strokeWidth={2} name="Caderas" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          {logs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Sin registros aun.</p>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <Card key={log.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">
                        {new Date(log.loggedAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      {log.weight && <span className="font-bold">{log.weight} kg</span>}
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      {log.chest && <span>Pecho: {log.chest}cm</span>}
                      {log.waist && <span>Cintura: {log.waist}cm</span>}
                      {log.hips && <span>Caderas: {log.hips}cm</span>}
                      {log.leftArm && <span>Brazo Izq: {log.leftArm}cm</span>}
                      {log.rightArm && <span>Brazo Der: {log.rightArm}cm</span>}
                      {log.leftLeg && <span>Pierna Izq: {log.leftLeg}cm</span>}
                      {log.rightLeg && <span>Pierna Der: {log.rightLeg}cm</span>}
                    </div>
                    {log.notes && <p className="mt-2 text-sm italic">{log.notes}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="photos" className="mt-4">
          {logs.filter((l) => l.photoFront || l.photoSide || l.photoBack).length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Aun no hay fotos de progreso.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {logs
                .filter((l) => l.photoFront || l.photoSide || l.photoBack)
                .map((log) => (
                  <Card key={log.id}>
                    <CardContent className="p-3">
                      <p className="text-sm font-medium mb-2">
                        {new Date(log.loggedAt).toLocaleDateString("es-ES")}
                      </p>
                      <div className="grid grid-cols-3 gap-1">
                        {[log.photoFront, log.photoSide, log.photoBack].map((photo, i) =>
                          photo ? (
                            <img
                              key={i}
                              src={photo}
                              alt={["Frente", "Lateral", "Espalda"][i]}
                              className="aspect-[3/4] rounded object-cover"
                            />
                          ) : (
                            <div key={i} className="aspect-[3/4] rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                              {["Frente", "Lateral", "Espalda"][i]}
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
