"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileInput } from "@/lib/validations/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        reset({
          name: data.name || "",
          phone: data.phone || "",
          age: data.age || undefined,
          height: data.height || undefined,
          weight: data.weight || undefined,
          goal: data.goal || "",
        });
        setLoading(false);
      });
  }, [reset]);

  async function onSubmit(data: ProfileInput) {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Perfil actualizado!");
      router.refresh();
    } catch {
      toast.error("Error al actualizar el perfil");
    }
  }

  if (loading) {
    return <div className="py-8 text-center text-muted-foreground">Cargando...</div>;
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Mi Perfil</h1>
      <p className="mt-1 text-muted-foreground">Actualiza tu informacion personal</p>

      <Card className="mt-6 max-w-2xl">
        <CardHeader>
          <CardTitle>Informacion Personal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Nombre Completo</Label>
                <Input {...register("name")} />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div>
                <Label>Telefono</Label>
                <Input {...register("phone")} />
              </div>
              <div>
                <Label>Edad</Label>
                <Input type="number" {...register("age")} />
              </div>
              <div>
                <Label>Altura (cm)</Label>
                <Input type="number" step="0.1" {...register("height")} />
              </div>
              <div>
                <Label>Peso (kg)</Label>
                <Input type="number" step="0.1" {...register("weight")} />
              </div>
              <div>
                <Label>Objetivo</Label>
                <Select onValueChange={(v) => setValue("goal", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose weight">Perder Peso</SelectItem>
                    <SelectItem value="gain muscle">Ganar Musculo</SelectItem>
                    <SelectItem value="maintain">Mantener</SelectItem>
                    <SelectItem value="improve fitness">Mejorar Condicion Fisica</SelectItem>
                    <SelectItem value="body recomposition">Recomposicion Corporal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
