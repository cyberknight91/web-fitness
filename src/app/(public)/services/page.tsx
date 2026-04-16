import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Utensils, Monitor, Users, CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Entrenamiento personal, planes de nutrición, coaching online y sesiones grupales. Programas diseñados para tus objetivos específicos.",
};

const services = [
  {
    icon: Dumbbell,
    title: "Entrenamiento Personal",
    badge: "Mas Popular",
    description: "Sesiones de entrenamiento uno a uno adaptadas a tus objetivos. Cada entrenamiento esta disenado especificamente para ti segun tu nivel, equipo disponible y metas.",
    features: [
      "Programas de entrenamiento personalizados",
      "Correccion de forma y tecnica",
      "Programacion de sobrecarga progresiva",
      "Horarios flexibles",
      "Sesiones presenciales o virtuales",
      "Ajustes semanales del programa",
    ],
  },
  {
    icon: Utensils,
    title: "Planes de Nutricion",
    badge: null,
    description: "Planes de comidas basados en ciencia calculados para tus objetivos de composicion corporal. Cada macro esta contabilizado, cada comida es practica y deliciosa.",
    features: [
      "Calculo personalizado de macros",
      "Planes de comidas detallados con recetas",
      "Listas de la compra",
      "Recomendaciones de suplementos",
      "Adaptacion a alergias/preferencias",
      "Ajustes quincenales del plan",
    ],
  },
  {
    icon: Monitor,
    title: "Coaching Online",
    badge: "Mejor Valor",
    description: "Experiencia completa de coaching desde cualquier lugar del mundo. Recibe tu programa personalizado de entrenamiento y nutricion con soporte continuo.",
    features: [
      "Programa de entrenamiento en la app",
      "Plan de nutricion personalizado",
      "Videollamadas semanales",
      "Soporte por mensajes diario",
      "Revision de fotos de progreso",
      "Actualizaciones mensuales del programa",
    ],
  },
  {
    icon: Users,
    title: "Sesiones Grupales",
    badge: null,
    description: "Entrenamiento en grupo reducido (4-8 personas) combinando fuerza, acondicionamiento y motivacion comunitaria.",
    features: [
      "Grupo reducido (max 8 personas)",
      "Entrenamientos de cuerpo completo",
      "Adaptable a todos los niveles",
      "Responsabilidad grupal",
      "Ambiente energetico",
      "Horarios de manana y tarde",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">Nuestros Servicios</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Soluciones completas de fitness y nutricion para cada objetivo
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title} className="relative overflow-hidden">
              {service.badge && <Badge className="absolute top-4 right-4">{service.badge}</Badge>}
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-heading text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="font-heading text-2xl font-bold">No Sabes Que Servicio Es Para Ti?</h2>
          <p className="mt-2 text-muted-foreground">Contactanos y te ayudamos a encontrar el plan perfecto.</p>
          <Button asChild className="mt-6" size="lg">
            <Link href="/contact">Contactanos <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
