import { Card, CardContent } from "@/components/ui/card";
import { Award, BookOpen, Heart, Target } from "lucide-react";

const certifications = [
  "Entrenador Personal Certificado NSCA",
  "Nutricion Deportiva Nivel 2",
  "CSCS - Especialista en Fuerza y Acondicionamiento",
  "Certificado en RCP/DEA",
  "Certificado en Entrenamiento Funcional",
  "Certificado en Evaluacion del Movimiento (FMS)",
];

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">Sobre Mi</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Dedicados a ayudarte a convertirte en la mejor version de ti mismo
          </p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
            <div className="flex h-full items-center justify-center text-6xl font-heading font-black text-primary/20">
              FP
            </div>
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold">Victor Ajileas Ugiaros</h2>
            <p className="mt-2 text-primary font-semibold">Entrenador Personal y Nutricionista Certificado</p>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Con mas de 10 anos de experiencia en la industria del fitness, he ayudado a cientos
                de clientes a transformar sus cuerpos y sus vidas. Mi enfoque combina metodos de
                entrenamiento basados en evidencia con estrategias de nutricion personalizadas.
              </p>
              <p>
                Creo que el fitness no se trata de perfeccion, sino de progreso. Cada persona es
                diferente, y cada programa que creo esta adaptado a los objetivos, estilo de vida
                y preferencias individuales.
              </p>
              <p>
                Ya sea que quieras perder peso, ganar musculo, mejorar tu rendimiento deportivo o
                simplemente sentirte mejor, estoy aqui para guiarte en cada paso del camino.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-center font-heading text-3xl font-bold">Mi Filosofia</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Target, title: "Orientado a Objetivos", text: "Cada sesion y cada comida tiene un proposito alineado con tus metas especificas." },
              { icon: BookOpen, title: "Educacion Primero", text: "Te enseno el 'por que' detras de cada ejercicio y decision nutricional." },
              { icon: Heart, title: "Habitos Sostenibles", text: "Sin dietas extremas ni programas imposibles. Construimos habitos que duran toda la vida." },
              { icon: Award, title: "Responsabilidad", text: "Seguimiento regular, control de progreso y apoyo constante para mantenerte en el camino." },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="p-6 text-center">
                  <item.icon className="mx-auto h-8 w-8 text-primary" />
                  <h3 className="mt-3 font-heading text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-center font-heading text-3xl font-bold">Certificaciones</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-4">
                <Award className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
