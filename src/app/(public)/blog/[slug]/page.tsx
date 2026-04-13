export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug, published: true } });
  if (!post) notFound();

  return (
    <div className="py-16">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Volver al Blog</Link>
        </Button>
        {post.coverImage && (
          <div className="aspect-video overflow-hidden rounded-xl bg-muted">
            <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
          </div>
        )}
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {post.publishedAt?.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
        </div>
        <h1 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">{post.title}</h1>
        <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
          {post.content.split("\n").map((paragraph, i) => (<p key={i}>{paragraph}</p>))}
        </div>
      </article>
    </div>
  );
}
