import type { Metadata } from "next";
import { getPublishedArticles } from "@/lib/articles";
import ResourcesGrid from "./ResourcesGrid";

// Always reflect the current set of published articles (DB is local + fast, and the
// index must never show stale/empty after a redeploy resets the ISR cache).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resources — LEVEL7",
  description:
    "Insights, guides, and playbooks on AI marketing, lead generation, and growing your business without an agency.",
  alternates: { canonical: "https://thelevel7.ai/resources" },
  openGraph: {
    title: "Resources — LEVEL7",
    description:
      "Insights, guides, and playbooks on AI marketing, lead generation, and growth.",
    url: "https://thelevel7.ai/resources",
    type: "website",
  },
};

export default async function ResourcesPage() {
  const articles = await getPublishedArticles();
  return <ResourcesGrid articles={articles} />;
}
