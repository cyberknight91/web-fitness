"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Clock, Monitor, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setSubmitted(true);
      toast.success("Mensaje enviado correctamente!");
    } catch {
      toast.error("Error al enviar el mensaje. Intentalo de nuevo.");
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-16">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-primary" />
          <h2 className="mt-4 font-heading text-2xl font-bold">Mensaje Enviado!</h2>
          <p className="mt-2 text-muted-foreground">
            Gracias por contactarnos. Te responderemos en menos de 24 horas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">Contactanos</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tienes alguna pregunta o estas listo para empezar? Nos encantaria saber de ti.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href="mailto:contacto@ugiarosfit.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    contacto@ugiarosfit.com
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Tiempo de respuesta</p>
                  <p className="text-sm text-muted-foreground">Menos de 24 horas</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <Monitor className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Modalidad</p>
                  <p className="text-sm text-muted-foreground">Presencial y online</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-heading">Enviar Mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Nombre *</Label>
                    <Input id="name" {...register("name")} />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" {...register("email")} />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Telefono</Label>
                    <Input id="phone" {...register("phone")} />
                  </div>
                  <div>
                    <Label htmlFor="service">Me Interesa</Label>
                    <Select onValueChange={(v) => { if (v) setValue("service", v); }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entrenamiento-personal">Entrenamiento Personal</SelectItem>
                        <SelectItem value="nutricion">Planes de Nutricion</SelectItem>
                        <SelectItem value="coaching-online">Coaching Online</SelectItem>
                        <SelectItem value="sesiones-grupales">Sesiones Grupales</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea id="message" rows={5} {...register("message")} />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
