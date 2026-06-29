"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ArticleCard } from "@/lib/articles";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ResourcesGrid({ articles }: { articles: ArticleCard[] }) {
  return (
    <>
      {/* ── HERO ── */}
      <section className="pt-36 pb-16 border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="label mb-4"
          >
            Resources
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="font-bold font-satoshi text-[#1A1A1A] mb-6"
            style={{ fontSize: "clamp(3rem,6vw,5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            Insights &amp; playbooks.
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="text-[#6B6B6B] text-xl leading-relaxed max-w-2xl"
          >
            Practical guides on AI marketing, lead generation, and building a business that
            grows without an agency.
          </motion.p>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        {articles.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <motion.div
                key={a.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fadeUp}
              >
                <Link href={`/resources/${a.slug}`} className="card block h-full overflow-hidden group">
                  {/* Cover */}
                  <div className="relative aspect-[16/9] bg-[#F7F7F7] overflow-hidden">
                    {a.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={a.cover_image}
                        alt={a.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl font-bold font-satoshi text-[#E5E5E5] select-none">L7</span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider bg-accent text-[#1A1A1A] px-2.5 py-1 rounded-full">
                      {a.category}
                    </span>
                  </div>
                  {/* Body */}
                  <div className="p-6">
                    <h2 className="text-lg font-bold font-satoshi text-[#1A1A1A] leading-snug mb-2 line-clamp-2 group-hover:text-[#000] transition-colors">
                      {a.title}
                    </h2>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-3 mb-4">
                      {a.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#767676]">
                      {a.published_at && <span>{formatDate(a.published_at)}</span>}
                      {a.published_at && <span>·</span>}
                      <span>{a.reading_time} min read</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#F7F7F7] border border-[#E5E5E5] flex items-center justify-center mb-6">
        <span className="text-2xl font-bold font-satoshi text-[#E5E5E5]">L7</span>
      </div>
      <h2 className="text-2xl font-bold font-satoshi text-[#1A1A1A] mb-3">New resources coming soon.</h2>
      <p className="text-[#6B6B6B] max-w-md">
        We&apos;re putting together our best playbooks on AI marketing and growth. Check back shortly.
      </p>
    </div>
  );
}
