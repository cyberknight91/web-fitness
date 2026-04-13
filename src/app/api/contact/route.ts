import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        service: data.service || null,
        message: data.message,
      },
    });

    return NextResponse.json({ message: "Message received" });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit message" },
      { status: 400 }
    );
  }
}
