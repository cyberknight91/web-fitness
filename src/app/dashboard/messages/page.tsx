export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MessageThread } from "@/components/dashboard/message-thread";

export default async function MessagesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  // Find admin user (the trainer)
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });

  if (!admin) {
    return (
      <div>
        <h1 className="font-heading text-2xl font-bold">Mensajes</h1>
        <p className="mt-4 text-muted-foreground">Aun no hay entrenador disponible para mensajeria.</p>
      </div>
    );
  }

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { fromUserId: session.user.id, toUserId: admin.id },
        { fromUserId: admin.id, toUserId: session.user.id },
      ],
    },
    orderBy: { createdAt: "asc" },
    include: { fromUser: { select: { name: true, role: true } } },
  });

  // Mark unread messages as read
  await prisma.message.updateMany({
    where: {
      toUserId: session.user.id,
      fromUserId: admin.id,
      read: false,
    },
    data: { read: true },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Mensajes</h1>
      <p className="mt-1 text-muted-foreground">Chatea con tu entrenador</p>
      <MessageThread
        messages={JSON.parse(JSON.stringify(messages))}
        currentUserId={session.user.id}
        otherUserId={admin.id}
        otherUserName={admin.name}
      />
    </div>
  );
}
