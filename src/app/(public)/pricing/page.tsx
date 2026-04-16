import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Precios y Planes",
  description:
    "Elige el plan de coaching que se adapta a tus objetivos: Básico (79€/mes), Pro (149€/mes) o Elite (279€/mes). Cancela cuando quieras.",
};

const plans = [
  {
    name: "Basico",
    price: "79€",
    period: "/mes",
    description: "Perfecto para comenzar tu camino fitness",
    badge: null,
    features: [
      "Programa de entrenamiento personalizado",
      "Guias basicas de nutricion",
      "Actualizaciones mensuales del programa",
      "Soporte por email",
      "Acceso al panel de cliente",
    ],
    cta: "Empezar",
  },
  {
    name: "Pro",
    price: "149€",
    period: "/mes",
    description: "Nuestro plan mas popular para resultados serios",
    badge: "MAS POPULAR",
    features: [
      "Todo lo del plan Basico",
      "Plan de comidas personalizado con macros",
      "Videollamadas quincenales",
      "Ajustes semanales del programa",
      "Soporte prioritario por mensajes",
      "Revision de fotos de progreso",
      "Guia de suplementacion",
    ],
    cta: "Elegir Pro",
  },
  {
    name: "Elite",
    price: "279€",
    period: "/mes",
    description: "Coaching completo para maxima transformacion",
    badge: "MEJORES RESULTADOS",
    features: [
      "Todo lo del plan Pro",
      "Soporte por mensajes diario",
      "Videollamadas semanales",
      "Libro de recetas personalizado",
      "Listas de la compra",
      "Preparacion para competicion/sesion de fotos",
      "Coaching de estilo de vida y habitos",
      "Horarios prioritarios",
    ],
    cta: "Ir a Elite",
  },
];

export default function PricingPage() {
  return (
    <div className="relative py-20">
      <div className="hero-glow opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Invierte en tu mejor version
          </div>
          <h1 className="font-heading text-5xl font-black tracking-tighter sm:text-6xl">
            Precios <span className="text-gradient">simples</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Elige el plan que se adapte a tus objetivos. Cancela cuando quieras.
          </p>
        </div>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const featured = i === 1;
            return (
              <div
                key={plan.name}
                className={`relative ${featured ? "lg:-my-4 lg:scale-[1.04]" : ""}`}
              >
                {featured && (
                  <div
                    aria-hidden
                    className="absolute -inset-px rounded-xl bg-gradient-to-br from-primary/70 via-primary/30 to-[oklch(0.78_0.17_55)/0.5] opacity-90 blur-[1px]"
                  />
                )}
                <Card
                  className={`relative flex h-full flex-col overflow-hidden transition-all duration-300 ${
                    featured
                      ? "border-transparent bg-card shadow-[0_20px_60px_-20px_oklch(0.85_0.28_145/0.35)]"
                      : "border-border/50 bg-card/60 hover:scale-[1.02] hover:border-primary/40 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  {plan.badge && (
                    <div
                      className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest ${
                        featured
                          ? "bg-primary text-primary-foreground glow"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {plan.badge}
                    </div>
                  )}

                  <CardHeader className="pt-8 text-left">
                    <CardTitle className="font-heading text-2xl font-extrabold tracking-tight">
                      {plan.name}
                    </CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span
                        className={`font-heading text-6xl font-black tracking-tighter ${
                          featured ? "text-gradient" : ""
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col">
                    <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
                    <ul className="flex-1 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm">
                          <CheckCircle2
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                              featured ? "text-primary" : "text-primary/70"
                            }`}
                          />
                          <span className="text-foreground/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className={`mt-8 w-full font-semibold transition-all duration-300 ${
                        featured ? "hover:glow" : ""
                      }`}
                      variant={featured ? "default" : "outline"}
                      size="lg"
                    >
                      <Link href="/register">{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mt-20 overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-10 text-center backdrop-blur">
          <h3 className="font-heading text-2xl font-extrabold tracking-tight">
            Sesiones <span className="text-gradient">grupales</span>
          </h3>
          <div className="mt-3">
            <span className="font-heading text-4xl font-black tracking-tighter">25€</span>
            <span className="text-muted-foreground"> /sesion</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            O ahorra con un bono de 10 sesiones por 200€
          </p>
          <Button asChild variant="outline" className="mt-6 hover:border-primary/60 hover:text-primary">
            <Link href="/contact">Reservar sesion</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
