import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About | LEVEL7",
  description:
    "A growth agency for service businesses worldwide, and the software that powers it. Each side makes the other sharper.",
  alternates: {
    canonical: "https://thelevel7.ai/about",
  },
};

export default function Page() {
  return <AboutContent />;
}
