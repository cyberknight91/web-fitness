import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const messageSchema = z.object({
  toUserId: z.string(),
  content: z.string().min(1).max(2000),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = messageSchema.parse(body);

    const message = await prisma.message.create({
      data: {
        fromUserId: session.user.id,
        toUserId: data.toUserId,
        content: data.content,
      },
    });

    return NextResponse.json(message);
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 400 });
  }
}
