import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { LEGAL_DOCS, LEGAL_ENTITY, relatedLinks } from "@/lib/legal/config";

const doc = LEGAL_DOCS.terms;
const {
  legalName,
  jurisdiction,
  registrationNumber,
  taxId,
  registeredOffice,
  emails,
} = LEGAL_ENTITY;

// Build the company-identification rows, showing only identifiers we actually
// have and listing each distinct contact address once.
const contactAddrs = Array.from(
  new Set([emails.general, emails.legal, emails.privacy])
);
const companyRows: string[][] = [
  ["Company", legalName],
  ["Jurisdiction", `${jurisdiction} (EU member state)`],
  ...(registrationNumber ? [["Registration number (HE)", registrationNumber]] : []),
  ...(taxId ? [["Tax identification number", taxId]] : []),
  ["Registered office", registeredOffice],
  ...contactAddrs.map((addr, i) => [i === 0 ? "Contact" : "", addr]),
];

export const metadata: Metadata = {
  title: `${doc.title} | LEVEL7`,
  description:
    "The terms governing use of the LEVEL7 website, plus the legal notice and company identification for D.T LEVEL 7 TECHNOLOGY LIMITED (Cyprus).",
  alternates: { canonical: doc.href },
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    h: "1. Acceptance of these terms",
    p: [
      `These Terms of Use (“Terms”) govern your access to and use of the LEVEL7 website at www.thelevel7.ai (the “Site”), operated by ${legalName}. By accessing or using the Site, you agree to these Terms. If you do not agree, please do not use the Site.`,
      "These Terms apply to the website itself. Use of the BOB product is governed by its own separate terms.",
    ],
  },
  {
    id: "company",
    h: "2. Legal notice & company identification",
    p: ["This Site is provided by:"],
    table: {
      head: ["Detail", "Information"],
      rows: companyRows,
    },
  },
  {
    id: "use",
    h: "3. Permitted use of the Site",
    p: ["You agree to use the Site lawfully and not to:"],
    list: [
      "Use the Site in breach of any applicable law or regulation.",
      "Attempt to gain unauthorised access to, probe, scan or disrupt the Site or its infrastructure.",
      "Scrape, harvest or systematically extract content or data except as expressly permitted.",
      "Introduce malware or any code intended to harm, or interfere with the proper working of, the Site.",
      "Misrepresent your identity or submit false information through our forms.",
    ],
  },
  {
    id: "ip",
    h: "4. Intellectual property",
    p: [
      `All content on the Site (including text, graphics, logos, the “LEVEL7” brand, layout and code) is owned by or licensed to ${legalName} and is protected by intellectual-property laws. You may view and print pages for your own informational use. You may not copy, reproduce, republish or exploit any part of the Site for commercial purposes without our prior written consent.`,
    ],
  },
  {
    id: "no-advice",
    h: "5. No professional advice; accuracy",
    p: [
      "The Site’s content is provided for general information about LEVEL7 and its services. It does not constitute legal, financial, tax, marketing or other professional advice, and should not be relied on as such. While we work to keep the Site accurate and up to date, we make no guarantee that all content is complete, current or error-free.",
    ],
  },
  {
    id: "forward-looking",
    h: "6. Forward-looking statements; no offer of securities",
    p: [
      "Parts of the Site (including any investor-facing or roadmap content) may contain forward-looking statements, projections, targets and illustrative figures (for example revenue, ROI, growth or market estimates). These are based on current assumptions, are inherently uncertain, and actual results may differ materially. They are provided for information only.",
      "Nothing on the Site constitutes an offer to sell, a solicitation of an offer to buy, or a recommendation regarding any security, investment or financial instrument, in any jurisdiction. Any actual investment discussion would take place separately under appropriate documentation and applicable law.",
    ],
  },
  {
    id: "third-party",
    h: "7. Third-party links & services",
    p: [
      "The Site may link to third-party websites or rely on third-party services. We do not control and are not responsible for the content, policies or practices of third parties. Links are provided for convenience and do not imply endorsement.",
    ],
  },
  {
    id: "warranties",
    h: "8. Disclaimer of warranties",
    p: [
      "The Site is provided “as is” and “as available”, without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose and non-infringement, to the maximum extent permitted by law. We do not warrant that the Site will be uninterrupted, secure or error-free.",
    ],
  },
  {
    id: "liability",
    h: "9. Limitation of liability",
    p: [
      "To the fullest extent permitted by law, we will not be liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of profits, revenue, data or goodwill, arising from your use of, or inability to use, the Site.",
      "Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law, including liability for death or personal injury caused by negligence, for fraud, or any statutory rights you have as a consumer.",
    ],
  },
  {
    id: "privacy",
    h: "10. Privacy & cookies",
    p: [
      "Our handling of personal data and cookies is described in our Privacy & Cookie Policy, which forms part of these Terms by reference.",
    ],
  },
  {
    id: "changes",
    h: "11. Changes to these Terms",
    p: [
      "We may update these Terms from time to time. Changes take effect when posted, with the “last updated” date revised above. Your continued use of the Site after changes are posted constitutes acceptance of the updated Terms.",
    ],
  },
  {
    id: "law",
    h: "12. Governing law & jurisdiction",
    p: [
      `These Terms are governed by the laws of ${jurisdiction}, without regard to conflict-of-laws principles, and subject to any mandatory consumer-protection rights you may have in your country of residence. The courts of ${jurisdiction} shall have jurisdiction, save where applicable law grants you the right to bring proceedings elsewhere.`,
      `Questions about these Terms can be sent to ${emails.legal}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title={doc.title}
      updated={doc.updated}
      version={doc.version}
      intro="These terms govern your use of the LEVEL7 website and include our legal notice (company identification). Please read them carefully."
      sections={sections}
      related={relatedLinks("terms")}
    />
  );
}
