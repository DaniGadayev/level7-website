import type { Metadata } from "next";
import { Bebas_Neue, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import CookieConsent from "@/components/CookieConsent";
import ConsentScripts from "@/components/ConsentScripts";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thelevel7.ai"),
  title: "LEVEL7: Marketing That Pays for Itself",
  description:
    "LEVEL7 is a growth company. Full-service digital marketing plus the software we built to run it: filtered leads, automated warming, and returns you can measure.",
  keywords:
    "digital marketing agency, lead generation, marketing ROI, filtered leads, marketing automation, AI marketing software",
  icons: {
    icon: "/logo-icon.png",
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${poppins.variable}`}>
      <body className="bg-white text-ink antialiased font-body">
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <CookieConsent />
        <ConsentScripts />
      </body>
    </html>
  );
}
