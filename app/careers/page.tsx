import type { Metadata } from "next";
import CareersContent, { type Posting } from "./CareersContent";

export const metadata: Metadata = {
  title: "Careers | LEVEL7",
  description:
    "Open roles at LEVEL7. Join the team behind accountable marketing and the software that runs it.",
  alternates: {
    canonical: "https://thelevel7.ai/careers",
  },
};

// Postings are managed live in the admin CMS; always render the current set.
export const dynamic = "force-dynamic";

const CAREERS_FEED_URL =
  process.env.CAREERS_ADMIN_URL || "http://level7-admin:3001/api/careers/public";

async function getOpenPostings(): Promise<Posting[]> {
  try {
    const res = await fetch(CAREERS_FEED_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.postings) ? data.postings : [];
  } catch (err) {
    // A CMS hiccup must never 500 the public page; the empty state renders instead.
    console.error("[careers] failed to load postings", err);
    return [];
  }
}

export default async function Page() {
  const postings = await getOpenPostings();
  return <CareersContent postings={postings} />;
}
