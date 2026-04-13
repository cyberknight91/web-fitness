"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Utensils,
  Star,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Panel" },
  { href: "/admin/clients", icon: Users, label: "Clientes" },
  { href: "/admin/routines", icon: Dumbbell, label: "Rutinas" },
  { href: "/admin/meal-plans", icon: Utensils, label: "Planes Nutricionales" },
  { href: "/admin/stories", icon: Star, label: "Historias" },
  { href: "/admin/blog", icon: FileText, label: "Blog" },
  { href: "/admin/messages", icon: MessageSquare, label: "Mensajes" },
];

export function AdminNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-border/40 bg-card">
        <div className="flex h-16 items-center gap-2 border-b border-border/40 px-6">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-heading text-lg font-bold">Panel Admin</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border/40 p-3 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Ver Sitio Publico
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 justify-start text-muted-foreground"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesion
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-md px-4">
        <span className="flex items-center gap-2 font-heading font-bold">
          <Shield className="h-5 w-5 text-primary" />
          Admin
        </span>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div className="absolute top-14 left-0 right-0 border-b border-border/40 bg-background p-4 space-y-1" onClick={(e) => e.stopPropagation()}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground mt-2"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesion
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
