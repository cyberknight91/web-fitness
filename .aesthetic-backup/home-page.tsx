import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dumbbell,
  Utensils,
  Monitor,
  Users,
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
} from "lucide-react";

const services = [
  {
    icon: Dumbbell,
    title: "Entrenamiento Personal",
    description: "Programas de entrenamiento personalizados para tus objetivos, nivel y horario.",
  },
  {
    icon: Utensils,
    title: "Planes de Nutricion",
    description: "Planes de comidas con macros calculados para tu cuerpo y objetivos.",
  },
  {
    icon: Monitor,
    title: "Coaching Online",
    description: "Coaching completo a distancia con seguimiento por app y soporte 24/7.",
  },
  {
    icon: Users,
    title: "Sesiones Grupales",
    description: "Sesiones de entrenamiento en grupo reducido que crean comunidad y resultados.",
  },
];

const stats = [
  { value: "500+", label: "Clientes Transformados" },
  { value: "10+", label: "Anos de Experiencia" },
  { value: "98%", label: "Retencion de Clientes" },
  { value: "15k+", label: "Entrenamientos Realizados" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background dark:from-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neon/10 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="animate-fade-in-up font-heading text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Transforma Tu Cuerpo.
            <br />
            <span className="text-primary">Eleva Tu Vida.</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-200 mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Entrenamiento personal y coaching nutricional de expertos para ayudarte a conseguir
            los resultados que siempre quisiste. Basado en ciencia. Orientado a resultados. Personalizado para ti.
          </p>
          <div className="animate-fade-in-up animate-delay-300 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="text-base font-semibold px-8">
              <Link href="/register">
                Comienza Tu Transformacion
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8">
              <Link href="/services">Ver Servicios</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/40 bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl font-black text-primary">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Servicios */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">Nuestros Servicios</h2>
            <p className="mt-3 text-muted-foreground">
              Todo lo que necesitas para alcanzar tus objetivos fitness
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card key={service.title} className="group transition-all hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/services">
                Saber Mas <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Por que elegirnos */}
      <section className="border-y border-border/40 bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">Por Que Elegir FitPro?</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <TrendingUp className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">Resultados Probados</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Mas de 500 transformaciones exitosas con resultados medibles y duraderos.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">Base Cientifica</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Cada programa esta basado en ciencia del ejercicio e investigacion nutricional.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Star className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">100% Personalizado</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sin planes genericos. Todo esta adaptado a tus necesidades unicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Listo Para Comenzar Tu Transformacion?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Unete a cientos de clientes que ya lograron el fisico de sus suenos. Tu camino
            comienza con un solo paso.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="px-8 text-base font-semibold">
              <Link href="/register">Empezar Gratis</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 text-base">
              <Link href="/contact">Contactanos</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
