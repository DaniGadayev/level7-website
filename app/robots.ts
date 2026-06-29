import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://thelevel7.ai/sitemap.xml",
    host: "https://thelevel7.ai",
  };
}
