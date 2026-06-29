import type { MetadataRoute } from "next";
import { getPublishedArticlesStrict } from "@/lib/articles";

const BASE = "https://thelevel7.ai";

// Always list the current published set (so newly published articles are crawlable immediately).
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/resources`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  // Throws on DB error → /sitemap.xml returns 500 and crawlers keep the last good copy,
  // rather than emitting a 200 that silently drops every article URL.
  const articles = await getPublishedArticlesStrict();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/resources/${a.slug}`,
    lastModified: a.published_at ? new Date(a.published_at) : undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
