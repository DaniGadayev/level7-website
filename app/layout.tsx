import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "LEVEL7 — The AI System That Replaces Your Marketing Agency",
  description:
    "LEVEL7 is the AI system that generates leads automatically, runs your campaigns 24/7, and grows your business — without an agency. The right tool, at the right stage, every time.",
  keywords: "AI marketing, lead generation, marketing automation, SMB growth, replace marketing agency",
  icons: {
    icon: "/logo-icon.svg",
    shortcut: "/logo-icon.svg",
    apple: "/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-[#1A1A1A] antialiased font-satoshi [&_*]:md:cursor-none">
        <CustomCursor />
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
