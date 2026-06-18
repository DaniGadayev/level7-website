import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_DOCS, LEGAL_ENTITY } from "@/lib/legal/config";

export const metadata: Metadata = {
  title: "Legal — LEVEL7",
  description:
    "Legal documents for the LEVEL7 website: Privacy & Cookie Policy, Terms of Use & Legal Notice, and Accessibility Statement.",
  alternates: { canonical: "/legal" },
};

const docs = [
  {
    ...LEGAL_DOCS.privacy,
    blurb:
      "What personal data we collect, why, who we share it with, how long we keep it, your GDPR rights, and our use of cookies.",
  },
  {
    ...LEGAL_DOCS.terms,
    blurb:
      "The terms governing use of this website, our company identification (legal notice), and important disclaimers.",
  },
  {
    ...LEGAL_DOCS.accessibility,
    blurb:
      "Our commitment to accessibility, the WCAG 2.1 AA standard we target, and how to report any barrier.",
  },
];

export default function LegalHubPage() {
  const { emails, legalName, jurisdiction } = LEGAL_ENTITY;

  return (
    <div className="pt-36 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <p className="label mb-5">Legal</p>
        <h1 className="font-satoshi font-bold text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-[#1A1A1A] mb-4">
          Legal Center
        </h1>
        <p className="text-[17px] leading-[1.75] text-[#6B6B6B] mb-12 max-w-xl">
          The policies and notices that govern your use of the LEVEL7 website
          and explain how we handle your data.
        </p>

        <div className="grid sm:grid-cols-1 gap-4">
          {docs.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="card p-6 group flex items-start justify-between gap-6"
            >
              <div>
                <h2 className="font-satoshi font-bold text-lg text-[#1A1A1A] mb-1.5">
                  {d.title}
                </h2>
                <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-md">
                  {d.blurb}
                </p>
                <p className="text-xs text-[#AAAAAA] mt-3">
                  Last updated {d.updated}
                </p>
              </div>
              <span
                aria-hidden
                className="text-2xl text-[#AAAAAA] group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 shrink-0"
              >
                →
              </span>
            </Link>
          ))}
        </div>

        <div className="divider mt-14 mb-7" />
        <div className="text-sm text-[#6B6B6B] leading-relaxed">
          <p className="mb-2">
            <span className="text-[#1A1A1A] font-semibold">{legalName}</span> ·
            Registered in {jurisdiction}
          </p>
          <p>
            Privacy enquiries:{" "}
            <a
              href={`mailto:${emails.privacy}`}
              className="text-[#1A1A1A] hover:text-accent transition-colors font-medium"
            >
              {emails.privacy}
            </a>{" "}
            · Legal enquiries:{" "}
            <a
              href={`mailto:${emails.legal}`}
              className="text-[#1A1A1A] hover:text-accent transition-colors font-medium"
            >
              {emails.legal}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
