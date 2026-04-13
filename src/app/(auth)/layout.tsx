import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-primary/20 via-background to-background relative">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center gap-3 font-heading text-3xl font-bold">
            <Dumbbell className="h-10 w-10 text-primary" />
            FitPro
          </Link>
          <p className="mt-4 max-w-sm text-muted-foreground">
            Tu transformacion comienza aqui. Registra tus entrenamientos, sigue tu plan nutricional y ve resultados reales.
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
