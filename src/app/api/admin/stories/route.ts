import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const story = await prisma.successStory.create({
      data: {
        clientName: body.clientName,
        testimonial: body.testimonial,
        photoBefore: body.photoBefore || null,
        photoAfter: body.photoAfter || null,
        weightBefore: body.weightBefore ? parseFloat(body.weightBefore) : null,
        weightAfter: body.weightAfter ? parseFloat(body.weightAfter) : null,
        duration: body.duration || null,
        featured: body.featured || false,
      },
    });

    return NextResponse.json(story);
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.successStory.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
