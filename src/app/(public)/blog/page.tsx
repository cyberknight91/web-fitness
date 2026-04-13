export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Consejos, conocimientos y articulos para impulsar tu camino fitness
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">Articulos proximamente!</p>
        ) : (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/5">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5">
                    {post.coverImage && <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {post.publishedAt?.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                    </div>
                    <h3 className="mt-2 font-heading text-lg font-semibold group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{post.content.slice(0, 150)}...</p>
                    <Badge variant="secondary" className="mt-3">Leer Mas</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
