"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: RegisterInput) {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password, phone: data.phone }),
      });
      if (!res.ok) { const err = await res.json(); toast.error(err.error || "Error al registrarse"); return; }
      const result = await signIn("credentials", { email: data.email, password: data.password, redirect: false });
      if (result?.error) { toast.error("Registrado pero error al iniciar sesion. Inicia sesion manualmente."); router.push("/login"); return; }
      router.push("/dashboard");
      router.refresh();
    } catch { toast.error("Algo salio mal. Intentalo de nuevo."); }
  }

  return (
    <>
      <div className="mb-8 text-center lg:hidden">
        <Link href="/" className="inline-flex items-center gap-2 font-heading text-2xl font-bold">
          <Dumbbell className="h-7 w-7 text-primary" /> FitPro
        </Link>
      </div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-heading text-2xl">Crear Cuenta</CardTitle>
          <p className="text-sm text-muted-foreground">Comienza tu camino fitness hoy</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" placeholder="Juan Garcia" {...register("name")} />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" {...register("email")} />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Telefono (opcional)</Label>
              <Input id="phone" placeholder="+34 612 345 678" {...register("phone")} />
            </div>
            <div>
              <Label htmlFor="password">Contrasena</Label>
              <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar Contrasena</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" {...register("confirmPassword")} />
              {errors.confirmPassword && <p className="mt-1 text-xs text-destructive">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Ya tienes cuenta?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">Iniciar Sesion</Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
