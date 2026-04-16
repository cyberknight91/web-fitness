import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Ponte en contacto con UgiarosFit. Respondemos en menos de 24 horas. Cuéntanos sobre tu objetivo y te propondremos el mejor plan para ti.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
