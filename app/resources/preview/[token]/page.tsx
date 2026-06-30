import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { verifyPreviewToken } from "@/lib/preview-token";
import { getArticleByIdAny, getRelatedArticles } from "@/lib/articles";
import { renderMarkdown } from "@/lib/markdown";

// Never cache preview pages — always fetch fresh draft content.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Draft Preview — LEVEL7",
};

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function toISO(value: string | Date | null): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

function jsonLdScript(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const verified = await verifyPreviewToken(token);
  if (!verified) notFound();

  const article = await getArticleByIdAny(verified.id);
  if (!article) notFound();

  const related = await getRelatedArticles(article.slug, article.category);
  const html = renderMarkdown(article.content);

  const adminUrl = `https://manage.thelevel7.ai/content-queue`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: toISO(article.published_at),
    dateModified: toISO(article.updated_at),
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: "LEVEL7", url: "https://thelevel7.ai" },
    image: article.cover_image || undefined,
    mainEntityOfPage: `https://thelevel7.ai/resources/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />

      {/* ── PREVIEW BANNER ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 9999,
          background: "#FF9900",
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 24px",
          fontSize: "13px",
          fontWeight: 600,
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "16px" }}>⚠️</span>
          <span>
            DRAFT PREVIEW
            <span style={{ fontWeight: 400, marginLeft: 8 }}>
              — This page is not live. Status: <strong>{article.status.toUpperCase()}</strong>
              {article.status !== "published" ? " · Not visible to the public" : " · Live on the site"}
            </span>
          </span>
        </div>
        <a
          href={adminUrl}
          style={{
            background: "#000",
            color: "#FF9900",
            padding: "5px 14px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          ← Edit in Admin
        </a>
      </div>

      {/* ── HERO (identical to live) ── */}
      <article>
        <header className="pt-36 pb-12 border-b border-[#E5E5E5]">
          <div className="max-w-3xl mx-auto px-6">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              All resources
            </Link>
            <p className="label mb-4">{article.category}</p>
            <h1
              className="font-bold font-satoshi text-[#1A1A1A] mb-6"
              style={{ fontSize: "clamp(2rem,4.5vw,3.25rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
            >
              {article.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-[#6B6B6B]">
              <span className="font-medium text-[#1A1A1A]">{article.author}</span>
              {article.published_at && <span>·</span>}
              {article.published_at && <span>{formatDate(article.published_at)}</span>}
              <span>·</span>
              <span>{article.reading_time} min read</span>
            </div>
          </div>
        </header>

        {/* ── COVER ── */}
        {article.cover_image && (
          <div className="max-w-4xl mx-auto px-6 pt-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full aspect-[16/9] object-cover rounded-3xl border border-[#E5E5E5]"
            />
          </div>
        )}

        {/* ── BODY ── */}
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-[#E5E5E5]">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-[#6B6B6B] bg-[#F7F7F7] border border-[#E5E5E5] px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="border-t border-[#E5E5E5] bg-[#F7F7F7]">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <p className="label mb-8">More in {article.category}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/resources/${r.slug}`} className="card block h-full p-6 group bg-white">
                  <p className="label mb-3 text-[10px]">{r.category}</p>
                  <h3 className="text-base font-bold font-satoshi text-[#1A1A1A] leading-snug mb-2 group-hover:text-black transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA (identical to live) ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-[#1A1A1A] rounded-3xl px-8 py-14 text-center">
          <h2 className="text-3xl font-bold font-satoshi text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
            Ready to grow without an agency?
          </h2>
          <p className="text-[#AAAAAA] mb-8 max-w-lg mx-auto">
            LEVEL7 builds and runs your entire marketing system — automatically.
          </p>
          <Link href="/contact" className="btn-primary">
            Start Free
          </Link>
        </div>
      </section>
    </>
  );
}
