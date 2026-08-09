import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact | LEVEL7",
  description:
    "Book a call with LEVEL7 and find out what a growth system built around your numbers could do for your business.",
  alternates: {
    canonical: "https://thelevel7.ai/contact",
  },
};

export default function Page() {
  return <ContactContent />;
}
