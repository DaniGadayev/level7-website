/**
 * Single source of truth for the LEVEL7 marketing-site legal documents
 * (www.thelevel7.ai). Every legal page, the footer links, the contact-form
 * consent notice and the cookie banner read entity/contact/version data from
 * here so nothing can drift.
 *
 * NOTE: this is the marketing *website's* legal layer. The BOB product
 * (getbob.thelevel7.ai) has its own, product-specific suite — keep the entity
 * details consistent with it, but these documents are scoped to the website.
 *
 * Versions are date strings (YYYY-MM-DD). Bump a document's `version` when its
 * substance changes; bump COOKIE_POLICY_VERSION when the cookie/consent terms
 * change so the banner re-prompts returning visitors.
 */

export const LEGAL_ENTITY = {
  /** Contracting entity. */
  legalName: "D.T LEVEL 7 TECHNOLOGY LIMITED",
  /** Public brand. */
  brand: "LEVEL7",
  jurisdiction: "Cyprus",
  /** Cyprus registrar number — fill before publishing (do NOT invent). */
  registrationNumber: "[Cyprus company reg. no. — to be inserted]",
  registeredOffice: "[Registered office address, Cyprus — to be inserted]",
  emails: {
    general: "dani@thelevel7.ai",
    legal: "legal@thelevel7.ai",
    privacy: "privacy@thelevel7.ai",
  },
  siteUrl: "https://www.thelevel7.ai",
  /** Cyprus supervisory authority for GDPR complaints. */
  supervisoryAuthority:
    "Office of the Commissioner for Personal Data Protection (Cyprus) — https://www.dataprotection.gov.cy",
} as const;

export type LegalDocKey = "privacy" | "terms" | "accessibility";

export type LegalDocMeta = {
  key: LegalDocKey;
  title: string;
  href: string;
  version: string;
  /** Human "Last updated" label shown on the page. */
  updated: string;
};

const V = "2026-06-18";
const UPDATED = "18 June 2026";

export const LEGAL_DOCS: Record<LegalDocKey, LegalDocMeta> = {
  privacy: {
    key: "privacy",
    title: "Privacy & Cookie Policy",
    href: "/privacy",
    version: V,
    updated: UPDATED,
  },
  terms: {
    key: "terms",
    title: "Terms of Use & Legal Notice",
    href: "/terms",
    version: V,
    updated: UPDATED,
  },
  accessibility: {
    key: "accessibility",
    title: "Accessibility Statement",
    href: "/accessibility",
    version: V,
    updated: UPDATED,
  },
};

/**
 * The cookie/consent terms version. The consent banner stores this alongside
 * the visitor's choice and re-prompts when it changes. Lives separately from
 * the privacy doc version so we can re-prompt for cookies without forcing it
 * on every privacy-policy wording tweak.
 */
export const COOKIE_POLICY_VERSION = V;

/** Cross-links to the other legal documents — for the page footer. */
export function relatedLinks(
  exclude: LegalDocKey
): { href: string; label: string }[] {
  return (Object.keys(LEGAL_DOCS) as LegalDocKey[])
    .filter((k) => k !== exclude)
    .map((k) => ({ href: LEGAL_DOCS[k].href, label: LEGAL_DOCS[k].title }));
}
