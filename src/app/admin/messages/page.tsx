export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AdminMessages } from "@/components/admin/admin-messages";

export default async function AdminMessagesPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login");

  const clients = await prisma.user.findMany({
    where: { role: "CLIENT" },
    select: {
      id: true,
      name: true,
      email: true,
      receivedMessages: {
        where: { fromUserId: session.user.id, read: false },
        select: { id: true },
      },
      sentMessages: {
        where: { toUserId: session.user.id, read: false },
        select: { id: true },
      },
    },
    orderBy: { name: "asc" },
  });

  const clientsWithUnread = clients.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    unreadCount: c.sentMessages.length,
  }));

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Mensajes</h1>
      <p className="mt-1 text-muted-foreground">Comunicate con tus clientes</p>
      <AdminMessages clients={clientsWithUnread} adminId={session.user.id} />
    </div>
  );
}
