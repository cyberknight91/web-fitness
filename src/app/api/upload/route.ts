import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabaseAdmin, STORAGE_BUCKET } from "@/lib/supabase";
import crypto from "crypto";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
    }

    const ext = file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1];
    const filename = `${session.user.id}/${crypto.randomUUID()}.${ext}`;

    const { error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(filename, file, { contentType: file.type, upsert: false });

    if (error) {
      console.error("Supabase upload error:", error.message);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    const { data } = supabaseAdmin.storage.from(STORAGE_BUCKET).getPublicUrl(filename);

    return NextResponse.json({ url: data.publicUrl });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
