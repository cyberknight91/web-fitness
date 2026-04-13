"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginInput) {
    const result = await signIn("credentials", { email: data.email, password: data.password, redirect: false });
    if (result?.error) { toast.error("Email o contrasena incorrectos"); return; }
    const res = await fetch("/api/auth/session");
    const session = await res.json();
    if (session?.user?.role === "ADMIN") { router.push("/admin"); } else { router.push("/dashboard"); }
    router.refresh();
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
          <CardTitle className="font-heading text-2xl">Bienvenido de Vuelta</CardTitle>
          <p className="text-sm text-muted-foreground">Inicia sesion en tu cuenta</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" {...register("email")} />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Contrasena</Label>
              <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Iniciando sesion..." : "Iniciar Sesion"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            No tienes cuenta?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">Registrate</Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
