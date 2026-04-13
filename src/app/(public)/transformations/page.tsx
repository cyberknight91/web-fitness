export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingDown } from "lucide-react";

export default async function TransformationsPage() {
  const stories = await prisma.successStory.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">Transformaciones</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Resultados reales de personas reales. Mira lo que es posible con dedicacion y la guia correcta.
          </p>
        </div>

        {stories.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">Historias de transformacion proximamente!</p>
        ) : (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <Card key={story.id} className={`overflow-hidden ${story.featured ? "ring-2 ring-primary/30" : ""}`}>
                <div className="grid grid-cols-2 gap-1 p-2">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                    {story.photoBefore ? (
                      <img src={story.photoBefore} alt="Antes" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Antes</div>
                    )}
                    <Badge variant="secondary" className="absolute bottom-2 left-2 text-xs">Antes</Badge>
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                    {story.photoAfter ? (
                      <img src={story.photoAfter} alt="Despues" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Despues</div>
                    )}
                    <Badge className="absolute bottom-2 left-2 text-xs">Despues</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-lg font-semibold">{story.clientName}</h3>
                    {story.featured && <Star className="h-4 w-4 fill-primary text-primary" />}
                  </div>
                  {(story.weightBefore || story.weightAfter) && (
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <TrendingDown className="h-4 w-4 text-primary" />
                      <span>
                        {story.weightBefore}kg → {story.weightAfter}kg
                        {story.weightBefore && story.weightAfter && (
                          <span className="ml-1 font-semibold text-primary">
                            ({(story.weightBefore - story.weightAfter).toFixed(1)}kg)
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                  {story.duration && <p className="mt-1 text-xs text-muted-foreground">Duracion: {story.duration}</p>}
                  <p className="mt-3 text-sm italic text-muted-foreground">&ldquo;{story.testimonial}&rdquo;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
