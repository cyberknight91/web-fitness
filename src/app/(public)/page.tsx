"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  Sparkles,
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="hero-glow" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Coaching premium con resultados reales
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-heading text-5xl font-black leading-[1.05] tracking-tighter sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Transforma tu cuerpo.
            <br />
            <span className="text-gradient">Eleva tu vida.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl"
          >
            Entrenamiento personal y coaching nutricional de expertos para conseguir
            los resultados que siempre quisiste. Basado en ciencia. Orientado a resultados.
            Personalizado para ti.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="px-8 text-base font-semibold transition-all duration-300 hover:glow hover:scale-[1.02]"
            >
              <Link href="/register">
                Comienza tu transformacion
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="px-8 text-base hover:bg-accent/40"
            >
              <Link href="/services">Ver servicios</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/40 bg-muted/20 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="font-heading text-4xl font-black tracking-tight text-gradient sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Servicios */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              Nuestros <span className="text-gradient">servicios</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Todo lo que necesitas para alcanzar tus objetivos fitness
            </p>
          </motion.div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card className="group relative h-full border-border/50 bg-card/60 transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary/60">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-bold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="hover:border-primary/60 hover:text-primary">
              <Link href="/services">
                Saber mas <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Por que elegirnos */}
      <section className="relative border-y border-border/40 bg-muted/20 py-24">
        <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              Por que elegir <span className="text-gradient">FitPro</span>?
            </h2>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              { icon: TrendingUp, title: "Resultados Probados", text: "Mas de 500 transformaciones exitosas con resultados medibles y duraderos." },
              { icon: Shield, title: "Base Cientifica", text: "Cada programa esta basado en ciencia del ejercicio e investigacion nutricional." },
              { icon: Star, title: "100% Personalizado", text: "Sin planes genericos. Todo esta adaptado a tus necesidades unicas." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="hero-glow opacity-60" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
            Listo para comenzar tu <span className="text-gradient">transformacion</span>?
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Unete a cientos de clientes que ya lograron el fisico de sus suenos. Tu camino
            comienza con un solo paso.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="px-8 text-base font-semibold transition-all duration-300 hover:glow hover:scale-[1.02]"
            >
              <Link href="/register">Empezar gratis</Link>
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
