import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { LEGAL_DOCS, LEGAL_ENTITY, relatedLinks } from "@/lib/legal/config";

const doc = LEGAL_DOCS.privacy;
const { emails, legalName, jurisdiction, supervisoryAuthority } = LEGAL_ENTITY;

export const metadata: Metadata = {
  title: `${doc.title} | LEVEL7`,
  description:
    "How D.T LEVEL 7 TECHNOLOGY LIMITED collects, uses, shares and protects personal data on the LEVEL7 website, and how to exercise your GDPR rights.",
  alternates: { canonical: doc.href },
};

const sections: LegalSection[] = [
  {
    id: "controller",
    h: "1. Who is responsible for your data",
    p: [
      `${legalName} (“LEVEL7”, “we”, “us”) is the data controller for personal data processed through this website (www.thelevel7.ai). We are a company registered in ${jurisdiction}.`,
      `For any privacy matter (including the requests described below), contact our privacy team at ${emails.privacy}. Our full company identification and registered office are set out in our Terms of Use & Legal Notice.`,
    ],
  },
  {
    id: "data",
    h: "2. What personal data we collect",
    p: [
      "We keep data collection to the minimum needed to run this website and respond to you. We collect:",
    ],
    list: [
      "Contact details you provide: when you submit our contact form, your name, email address, phone number (optional), the subject you select and the message you write.",
      "Technical and usage data: when you visit, our servers and infrastructure automatically process limited technical data such as your IP address, browser type and operating system, the pages you view and the date/time of access. This is standard server-log information used to keep the site secure and working.",
      "Consent and preference data: your cookie choices and the timestamp/version of the consent you give, stored so we can honour and evidence your preferences.",
      "Analytics data: only if you consent to analytics cookies, we (and our analytics provider) process aggregated information about how the site is used. No analytics or marketing tracking runs before you opt in.",
    ],
  },
  {
    id: "purposes",
    h: "3. Why we use it, and our legal bases",
    p: [
      "Under the EU/UK General Data Protection Regulation (GDPR), we rely on the following legal bases:",
    ],
    table: {
      head: ["Purpose", "Data used", "Legal basis (GDPR Art. 6)"],
      rows: [
        [
          "Respond to your enquiry and follow up on it",
          "Contact-form details",
          "Taking steps at your request prior to a possible contract (Art. 6(1)(b)); and our legitimate interest in responding to enquiries (Art. 6(1)(f))",
        ],
        [
          "Operate, secure and troubleshoot the website",
          "Technical / server-log data",
          "Our legitimate interest in a secure, reliable site (Art. 6(1)(f))",
        ],
        [
          "Remember your cookie preferences",
          "Consent / preference data",
          "Compliance with our legal obligations and your consent (Art. 6(1)(c)/(a))",
        ],
        [
          "Measure and improve the website (analytics)",
          "Analytics data",
          "Your consent (Art. 6(1)(a)), withdrawable at any time",
        ],
      ],
    },
  },
  {
    id: "cookies",
    h: "4. Cookies & similar technologies",
    p: [
      "A cookie is a small file stored on your device. We use only a strictly-necessary cookie by default; everything else loads only after you opt in via our cookie banner. You can change or withdraw your choice at any time using the “Cookie settings” link in the footer.",
      "We do not use any advertising, profiling or tracking technology unless you have given consent. Blocking the strictly-necessary cookie may prevent the site from remembering your preferences.",
    ],
    table: {
      head: ["Cookie / technology", "Category", "Purpose", "Retention"],
      rows: [
        [
          "l7_consent",
          "Strictly necessary",
          "Stores your cookie-preference choices (and the policy version/date) so we can apply and evidence them.",
          "12 months",
        ],
        [
          "Analytics cookies (e.g. Google Analytics _ga)",
          "Analytics: consent required",
          "Set only if you accept analytics. Measure aggregated, de-identified usage to improve the site.",
          "Up to 14 months (only if enabled)",
        ],
      ],
    },
  },
  {
    id: "recipients",
    h: "5. Who we share your data with",
    p: [
      "We never sell your personal data. We share it only with trusted service providers (“processors”) who act on our instructions under a data-processing agreement, and only as far as needed to provide the service:",
    ],
    table: {
      head: ["Recipient", "Role", "Location"],
      rows: [
        [
          "Amazon Web Services (AWS)",
          "Website hosting & infrastructure",
          "European Union (Frankfurt, eu-central-1)",
        ],
        [
          "Resend",
          "Delivers contact-form submissions to our inbox",
          "EU / United States (under appropriate safeguards)",
        ],
        [
          "Analytics provider (e.g. Google), only if you consent",
          "Aggregated website analytics",
          "United States (under appropriate safeguards)",
        ],
      ],
    },
  },
  {
    id: "transfers",
    h: "6. International data transfers",
    p: [
      "Our website and database are hosted within the European Union. Where a processor is located outside the European Economic Area (for example, a US-based email or analytics provider), we ensure an adequate level of protection through the European Commission’s Standard Contractual Clauses (SCCs) and/or the EU–US Data Privacy Framework, together with additional safeguards where appropriate.",
      `You can ask us for more detail about the safeguards for any specific transfer by emailing ${emails.privacy}.`,
    ],
  },
  {
    id: "retention",
    h: "7. How long we keep it",
    list: [
      "Contact-form enquiries: kept for up to 24 months after our last contact, then deleted, unless a longer period is required to deal with a legal claim.",
      "Server / technical logs: kept for no longer than 12 months.",
      "Consent records: kept for the duration of your consent plus a reasonable period to evidence compliance.",
    ],
  },
  {
    id: "rights",
    h: "8. Your rights",
    p: [
      "Wherever GDPR applies, you have the right to:",
    ],
    list: [
      "Access: obtain a copy of the personal data we hold about you.",
      "Rectification: have inaccurate or incomplete data corrected.",
      "Erasure: ask us to delete your data (“right to be forgotten”).",
      "Restriction: ask us to limit how we use your data.",
      "Portability: receive your data in a structured, machine-readable format.",
      "Objection: object to processing based on our legitimate interests.",
      "Withdraw consent: at any time, where we rely on consent (e.g. analytics), without affecting prior processing.",
    ],
  },
  {
    id: "exercise",
    h: "9. How to exercise your rights & complain",
    p: [
      `To exercise any of these rights, email ${emails.privacy}. We respond within one month, as required by GDPR. There is normally no charge.`,
      `If you believe we have mishandled your data, you may lodge a complaint with the ${supervisoryAuthority} or with the data-protection authority in your EU/EEA country of residence. We would, however, appreciate the chance to address your concern first.`,
    ],
  },
  {
    id: "security",
    h: "10. How we protect your data",
    p: [
      "We apply appropriate technical and organisational measures to protect personal data, including encryption in transit (HTTPS), access controls, hosting within the EU, and limiting access to the people who need it. No method of transmission or storage is completely secure, but we work to protect your information and to address any incident promptly.",
    ],
  },
  {
    id: "children",
    h: "11. Children",
    p: [
      "This website and our services are intended for businesses and adults. We do not knowingly collect personal data from children. If you believe a child has provided us data, contact us and we will delete it.",
    ],
  },
  {
    id: "changes",
    h: "12. Changes to this policy",
    p: [
      "We may update this Privacy & Cookie Policy from time to time. We will revise the “last updated” date above and, where changes are material to the cookies/consent terms, ask returning visitors to review their cookie choices again.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title={doc.title}
      updated={doc.updated}
      version={doc.version}
      intro="This policy explains what personal data we collect through the LEVEL7 website, why we collect it, who we share it with, how long we keep it, and the rights you have under the GDPR. It covers this website only. The BOB product has its own privacy documentation."
      sections={sections}
      related={relatedLinks("privacy")}
    />
  );
}
