import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId");
  if (!clientId) {
    return NextResponse.json({ error: "Missing clientId" }, { status: 400 });
  }

  // Mark messages from this client as read
  await prisma.message.updateMany({
    where: {
      fromUserId: clientId,
      toUserId: session.user.id,
      read: false,
    },
    data: { read: true },
  });

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { fromUserId: session.user.id, toUserId: clientId },
        { fromUserId: clientId, toUserId: session.user.id },
      ],
    },
    orderBy: { createdAt: "asc" },
    include: { fromUser: { select: { name: true } } },
  });

  return NextResponse.json(messages);
}
