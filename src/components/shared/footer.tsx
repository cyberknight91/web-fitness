import Link from "next/link";
import { Dumbbell, Globe, Video, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-muted/20 backdrop-blur">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-heading text-lg font-extrabold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                <Dumbbell className="h-4 w-4" />
              </span>
              Ugiaros<span className="text-gradient">Fit</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Transforma tu cuerpo y mente con entrenamiento personal y coaching nutricional de expertos.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider">Enlaces</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">Sobre Mi</Link></li>
              <li><Link href="/services" className="hover:text-foreground transition-colors">Servicios</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">Precios</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider">Servicios</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Entrenamiento Personal</li>
              <li>Planes de Nutricion</li>
              <li>Coaching Online</li>
              <li>Sesiones Grupales</li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider">Conecta</h4>
            <div className="mt-3 flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Video className="h-5 w-5" />
              </a>
              <a href="mailto:contacto@ugiarosfit.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              contacto@ugiarosfit.com<br />
              +34 612 345 678
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} UgiarosFit. Todos los derechos reservados.</p>
          <p className="mt-1">Entrenador personal: <span className="text-foreground/80">Victor Ajileas Ugiaros</span></p>
        </div>
      </div>
    </footer>
  );
}
