import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ugiarosfit.com";

const publicRoutes = [
  { path: "", priority: 1.0, freq: "weekly" as const },
  { path: "about", priority: 0.8, freq: "monthly" as const },
  { path: "services", priority: 0.9, freq: "monthly" as const },
  { path: "pricing", priority: 0.9, freq: "monthly" as const },
  { path: "transformations", priority: 0.8, freq: "weekly" as const },
  { path: "blog", priority: 0.7, freq: "weekly" as const },
  { path: "contact", priority: 0.6, freq: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return publicRoutes.map((r) => ({
    url: r.path ? `${siteUrl}/${r.path}` : siteUrl,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
