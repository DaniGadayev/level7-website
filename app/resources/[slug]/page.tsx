import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getPublishedSlugs, getRelatedArticles } from "@/lib/articles";
import { renderMarkdown } from "@/lib/markdown";

export const revalidate = 60;
export const dynamicParams = true; // unknown slugs render on demand, then cache

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return { title: "Not found | LEVEL7" };
  }
  const title = article.seo_title || article.title;
  const description = article.seo_description || article.excerpt;
  const url = `https://thelevel7.ai/resources/${article.slug}`;
  return {
    title: `${title} | LEVEL7`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: toISO(article.published_at),
      authors: [article.author],
      images: article.cover_image ? [{ url: article.cover_image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article.cover_image ? [article.cover_image] : undefined,
    },
  };
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

// pg returns timestamptz as a Date; normalize to ISO 8601 for OG/JSON-LD crawlers.
function toISO(value: string | Date | null): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

// Serialize JSON for safe embedding inside a <script> tag. Plain JSON.stringify does
// NOT escape `<`, so a field containing "</script>" would break out and inject HTML
// (stored XSS). Escape the breakout characters (crawlers decode them back).
function jsonLdScript(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article.slug, article.category);
  const html = renderMarkdown(article.content);

  // JSON-LD for rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: toISO(article.published_at),
    dateModified: toISO(article.updated_at),
    author: { "@type": "Person", name: article.author },
    publisher: {
      "@type": "Organization",
      name: "LEVEL7",
      url: "https://thelevel7.ai",
    },
    image: article.cover_image || undefined,
    mainEntityOfPage: `https://thelevel7.ai/resources/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />

      {/* ── HERO ── */}
      <article>
        <header className="pt-36 pb-12 border-b border-line">
          <div className="max-w-3xl mx-auto px-6">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              All resources
            </Link>
            <p className="label mb-4">{article.category}</p>
            <h1
              className="display mb-6"
              style={{ fontSize: "clamp(2.2rem,5vw,3.6rem)" }}
            >
              {article.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="font-medium text-white/85">{article.author}</span>
              {article.published_at && <span>·</span>}
              {article.published_at && <span>{formatDate(article.published_at)}</span>}
              <span>·</span>
              <span>{article.reading_time} min read</span>
            </div>
          </div>
        </header>

        {/* ── COVER ── */}
        {article.cover_image && (
          <div className="max-w-4xl mx-auto px-6 -mt-0 pt-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full aspect-[16/9] object-cover rounded-2xl border border-line"
            />
          </div>
        )}

        {/* ── BODY — light reading island ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="reading-island rounded-2xl px-6 py-10 sm:px-12 sm:py-14">
            <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-[#E8E8E3]">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-[#5C5C5C] bg-[#F6F6F2] border border-[#E8E8E3] px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="border-t border-border bg-cream">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <p className="label mb-8">More in {article.category}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/resources/${r.slug}`} className="card block h-full overflow-hidden group bg-white">
                  <div className="relative aspect-[16/9] bg-cream overflow-hidden">
                    {r.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.cover_image} alt={r.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl font-bold font-satoshi text-[#E5E5E5] select-none">L7</span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-accent text-ink px-2 py-0.5 rounded-full">{r.category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-bold font-satoshi text-ink leading-snug mb-2 group-hover:text-black transition-colors line-clamp-2">
                      {r.title}
                    </h3>
                    <p className="text-sm text-muted line-clamp-2 mb-4">{r.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <span className="font-medium text-ink">{r.author}</span>
                      {r.published_at && <span>·</span>}
                      {r.published_at && <span>{formatDate(r.published_at)}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-[#0A0A0A] rounded-3xl px-8 py-14 text-center">
          <h2 className="display text-4xl text-white mb-4">
            Ready to grow without an agency?
          </h2>
          <p className="text-subtle mb-8 max-w-lg mx-auto">
            LEVEL7 builds and runs your entire marketing system, automatically.
          </p>
          <Link href="/contact" className="btn-primary">
            Start Free
          </Link>
        </div>
      </section>
    </>
  );
}
