export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ProgressTracker } from "@/components/dashboard/progress-tracker";

export default async function ProgressPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const logs = await prisma.progressLog.findMany({
    where: { userId: session.user.id },
    orderBy: { loggedAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Seguimiento de Progreso</h1>
      <p className="mt-1 text-muted-foreground">Registra tus medidas corporales y observa tu progreso a lo largo del tiempo</p>
      <ProgressTracker logs={JSON.parse(JSON.stringify(logs))} />
    </div>
  );
}
