import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SECRET_KEY!;
const bucket = process.env.SUPABASE_STORAGE_BUCKET || "photos";

const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

async function main() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === bucket);

  if (exists) {
    console.log(`Bucket "${bucket}" already exists`);
  } else {
    const { error } = await supabase.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    });
    if (error) {
      console.error("Error creating bucket:", error.message);
      process.exit(1);
    }
    console.log(`Bucket "${bucket}" created (public)`);
  }
}

main();
