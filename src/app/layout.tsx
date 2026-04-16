import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ugiarosfit.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "UgiarosFit | Entrenamiento Personal y Nutricion",
    template: "%s | UgiarosFit",
  },
  description:
    "Transforma tu cuerpo y mente con programas de entrenamiento personalizados y planes de nutricion de UgiarosFit. Coaching premium con resultados reales.",
  applicationName: "UgiarosFit",
  authors: [{ name: "Victor Ajileas Ugiaros" }],
  keywords: [
    "entrenador personal",
    "nutricion deportiva",
    "coaching online",
    "transformacion fisica",
    "plan de entrenamiento personalizado",
    "UgiarosFit",
    "Victor Ugiaros",
  ],
  manifest: "/manifest.json",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "UgiarosFit",
    title: "UgiarosFit | Entrenamiento Personal y Nutricion",
    description:
      "Transforma tu cuerpo y mente con programas de entrenamiento personalizados y planes de nutricion.",
  },
  twitter: {
    card: "summary_large_image",
    title: "UgiarosFit | Entrenamiento Personal y Nutricion",
    description:
      "Coaching premium con resultados reales. Entrenamiento personalizado y nutricion basada en ciencia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
