import { pool, safeQuery } from "./db";

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string;
  category: string;
  tags: string[];
  status: "draft" | "scheduled" | "published";
  published_at: string | null;
  word_count: number;
  reading_time: number;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

// Card view — everything except the heavy `content` column.
export interface ArticleCard {
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  author: string;
  category: string;
  tags: string[];
  published_at: string | null;
  reading_time: number;
}

const CARD_COLS =
  "slug, title, excerpt, cover_image, author, category, tags, published_at, reading_time";

/** All published articles, newest first. Safe at build time (returns [] if DB down). */
export async function getPublishedArticles(): Promise<ArticleCard[]> {
  return safeQuery<ArticleCard>(
    `SELECT ${CARD_COLS} FROM articles
     WHERE status = 'published'
     ORDER BY published_at DESC NULLS LAST, created_at DESC`
  );
}

/**
 * Like getPublishedArticles, but THROWS on DB error instead of returning [].
 * Used by the sitemap so a transient DB blip yields a 500 (crawlers keep the last
 * good sitemap) rather than a 200 that silently de-lists every article.
 */
export async function getPublishedArticlesStrict(): Promise<ArticleCard[]> {
  const res = await pool.query(
    `SELECT ${CARD_COLS} FROM articles
     WHERE status = 'published'
     ORDER BY published_at DESC NULLS LAST, created_at DESC`
  );
  return res.rows as ArticleCard[];
}

/** Just the slugs — for generateStaticParams. */
export async function getPublishedSlugs(): Promise<string[]> {
  const rows = await safeQuery<{ slug: string }>(
    `SELECT slug FROM articles WHERE status = 'published'`
  );
  return rows.map((r) => r.slug);
}

/** One published article by slug, or null if not found / not published. */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const rows = await safeQuery<Article>(
    `SELECT * FROM articles WHERE slug = $1 AND status = 'published' LIMIT 1`,
    [slug]
  );
  return rows[0] ?? null;
}

/** Related articles in the same category (excludes the current slug). */
export async function getRelatedArticles(
  slug: string,
  category: string,
  limit = 3
): Promise<ArticleCard[]> {
  return safeQuery<ArticleCard>(
    `SELECT ${CARD_COLS} FROM articles
     WHERE status = 'published' AND slug <> $1 AND category = $2
     ORDER BY published_at DESC NULLS LAST
     LIMIT $3`,
    [slug, category, limit]
  );
}
