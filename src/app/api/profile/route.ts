import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { profileSchema } from "@/lib/validations/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      phone: true,
      age: true,
      height: true,
      weight: true,
      goal: true,
      avatar: true,
    },
  });

  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = profileSchema.parse(body);

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        phone: data.phone ?? null,
        age: data.age ?? null,
        height: data.height ?? null,
        weight: data.weight ?? null,
        goal: data.goal ?? null,
      },
    });

    return NextResponse.json({ message: "Updated" });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 400 });
  }
}
