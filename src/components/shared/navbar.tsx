"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 glass transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 shadow-[0_4px_30px_-12px_rgba(0,0,0,0.5)]"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 font-heading text-xl font-extrabold tracking-tight"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 transition-all group-hover:ring-primary/50 group-hover:bg-primary/15">
            <Dumbbell className="h-5 w-5" />
          </span>
          <span>
            Fit<span className="text-gradient">Pro</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
          <Button
            asChild
            size="sm"
            className="font-semibold transition-all hover:glow"
          >
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
        <div className="border-t border-border/40 glass md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link href="/login">Iniciar Sesion</Link>
              </Button>
              <Button asChild size="sm" className="flex-1 font-semibold">
                <Link href="/register">Comenzar</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
