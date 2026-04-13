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
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug,
        content: body.content,
        coverImage: body.coverImage || null,
        published: body.published || false,
        publishedAt: body.published ? new Date() : null,
      },
    });

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const post = await prisma.blogPost.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
        coverImage: body.coverImage || null,
        published: body.published,
        publishedAt: body.published ? new Date() : null,
      },
    });

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 400 });
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

  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
