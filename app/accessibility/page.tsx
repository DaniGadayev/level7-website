import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { LEGAL_DOCS, LEGAL_ENTITY, relatedLinks } from "@/lib/legal/config";

const doc = LEGAL_DOCS.accessibility;
const { emails, legalName } = LEGAL_ENTITY;

export const metadata: Metadata = {
  title: `${doc.title} — LEVEL7`,
  description:
    "Our commitment to making the LEVEL7 website accessible, the standard we target, known limitations, and how to report accessibility issues.",
  alternates: { canonical: doc.href },
};

const sections: LegalSection[] = [
  {
    id: "commitment",
    h: "1. Our commitment",
    p: [
      `${legalName} is committed to making the LEVEL7 website accessible to as many people as possible, regardless of ability or technology. We see accessibility as part of building a quality experience for everyone.`,
    ],
  },
  {
    id: "standard",
    h: "2. Standard we aim for",
    p: [
      "We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA, the internationally recognised standard referenced by EU accessibility legislation. We test with this standard in mind and work to improve the Site over time.",
    ],
  },
  {
    id: "measures",
    h: "3. What we do",
    list: [
      "Use semantic HTML and meaningful structure so assistive technologies can interpret the page.",
      "Provide text alternatives for meaningful images.",
      "Maintain sufficient colour contrast for text and interactive elements.",
      "Support keyboard navigation and visible focus where interactive elements are used.",
      "Respect users’ reduced-motion preferences for animations where applicable.",
    ],
  },
  {
    id: "limitations",
    h: "4. Known limitations",
    p: [
      "Despite our efforts, some content may not yet be fully accessible — for example, certain rich animations or third-party embedded components. We are working to identify and address these. If you encounter a barrier, please let us know so we can help and prioritise a fix.",
    ],
  },
  {
    id: "feedback",
    h: "5. Feedback & contact",
    p: [
      `If you experience any difficulty using this Site, or need information in an alternative format, please contact us at ${emails.general}. Tell us the page, what happened, and the browser or assistive technology you were using. We aim to respond promptly and will do our best to provide the information or service you need through an accessible alternative.`,
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <LegalPage
      title={doc.title}
      updated={doc.updated}
      version={doc.version}
      intro="We want everyone to be able to use the LEVEL7 website. This statement explains the standard we target, what we do, known limitations, and how to reach us if something isn’t working for you."
      sections={sections}
      related={relatedLinks("accessibility")}
    />
  );
}
