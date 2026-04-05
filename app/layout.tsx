import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "LEVEL7 — Build an Empire. One Level at a Time.",
  description:
    "An AI-powered business growth platform with 7 floors. Each floor is a different product designed for a specific business stage. The right tool, at the right stage, every time.",
  keywords: "AI business growth, business coaching, SMB software, startup growth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="noise-bg bg-background text-white antialiased">
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
