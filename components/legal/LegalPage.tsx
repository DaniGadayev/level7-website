import Link from "next/link";
import { LEGAL_ENTITY } from "@/lib/legal/config";

/* Standalone public legal page in the LEVEL7 marketing shell. Server
   component — Navbar + Footer come from the root layout, so this renders only
   the content column. Sections support paragraphs, bullet lists and tables
   (cookie / sub-processor lists), plus an `id` for deep-linking (e.g.
   /privacy#cookies). A compact table of contents is generated from sections
   that declare an `id`. */

export type LegalSection = {
  /** Anchor id — enables a TOC entry and deep-links like /privacy#cookies. */
  id?: string;
  h: string;
  p?: string[];
  list?: string[];
  table?: { head: string[]; rows: string[][] };
};

export default function LegalPage({
  title,
  updated,
  version,
  intro,
  sections,
  related,
}: {
  title: string;
  updated: string;
  version?: string;
  intro: string;
  sections: LegalSection[];
  related?: { href: string; label: string }[];
}) {
  const toc = sections.filter((s) => s.id);

  return (
    <article className="pt-36 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <p className="label mb-5">Legal</p>
        <h1 className="font-satoshi font-bold text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-[#1A1A1A] mb-4">
          {title}
        </h1>
        <p className="text-sm text-[#AAAAAA] mb-10">
          Last updated {updated}
          {version ? <> · v{version}</> : null}
        </p>

        <p className="text-[17px] leading-[1.75] text-[#6B6B6B] mb-12">{intro}</p>

        {/* Table of contents */}
        {toc.length > 0 && (
          <nav
            aria-label="On this page"
            className="card p-6 mb-14 !border-[#E5E5E5] hover:!transform-none hover:!shadow-none hover:!border-[#E5E5E5]"
          >
            <p className="label mb-4">On this page</p>
            <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {toc.map((s, i) => (
                <li key={s.id} className="flex gap-3 text-sm">
                  <span className="text-accent font-bold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${s.id}`}
                    className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                  >
                    {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {sections.map((s, i) => (
            <section key={i} id={s.id} className="scroll-mt-28">
              <h2 className="font-satoshi font-bold text-[22px] leading-snug tracking-[-0.02em] text-[#1A1A1A] mb-4">
                {s.h}
              </h2>
              {s.p?.map((para, j) => (
                <p
                  key={j}
                  className="text-[15.5px] leading-[1.75] text-[#6B6B6B] mb-3.5"
                >
                  {para}
                </p>
              ))}
              {s.list && (
                <ul className="flex flex-col gap-2.5 mb-3.5 mt-1">
                  {s.list.map((li, j) => (
                    <li
                      key={j}
                      className="relative pl-5 text-[15.5px] leading-[1.7] text-[#6B6B6B] before:content-[''] before:absolute before:left-0 before:top-[0.65em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent"
                    >
                      {li}
                    </li>
                  ))}
                </ul>
              )}
              {s.table && (
                <div className="overflow-x-auto rounded-2xl border border-[#E5E5E5] mt-1">
                  <table className="w-full border-collapse text-[13.5px]">
                    <thead>
                      <tr className="bg-[#F7F7F7]">
                        {s.table.head.map((th, j) => (
                          <th
                            key={j}
                            className="text-left font-bold text-[#1A1A1A] px-4 py-3 border-b border-[#E5E5E5] whitespace-nowrap"
                          >
                            {th}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((row, j) => (
                        <tr key={j}>
                          {row.map((cell, k) => (
                            <td
                              key={k}
                              className="align-top px-4 py-3 leading-[1.55] text-[#6B6B6B]"
                              style={{
                                borderBottom:
                                  j < s.table!.rows.length - 1
                                    ? "1px solid #E5E5E5"
                                    : "none",
                              }}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer / cross-links */}
        <div className="divider mt-16 mb-7" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <span className="text-xs text-[#AAAAAA] max-w-sm leading-relaxed">
            © {new Date().getFullYear()} {LEGAL_ENTITY.legalName}. Registered in{" "}
            {LEGAL_ENTITY.jurisdiction}.
          </span>
          {related && related.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="text-sm font-semibold text-[#1A1A1A] hover:text-accent transition-colors"
                >
                  {r.label} <span aria-hidden>→</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
