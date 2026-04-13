"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Sobre Mi" },
  { href: "/services", label: "Servicios" },
  { href: "/transformations", label: "Transformaciones" },
  { href: "/pricing", label: "Precios" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contacto" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold">
          <Dumbbell className="h-6 w-6 text-primary" />
          <span>FitPro</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Iniciar Sesion</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/register">Comenzar</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link href="/login">Iniciar Sesion</Link>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <Link href="/register">Comenzar</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
