import type { Metadata } from "next";
import Script from "next/script";
import { Bebas_Neue, Poppins, IBM_Plex_Mono } from "next/font/google";
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

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thelevel7.ai"),
  title: "LEVEL7: Marketing That Pays for Itself",
  description:
    "LEVEL7 is a growth company for service businesses. Full-service digital marketing plus the software we built to run it: filtered leads, automated warming, and returns you can measure.",
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
    <html lang="en" className={`${bebas.variable} ${poppins.variable} ${plexMono.variable}`}>
      <body className="bg-[#FBFBF8] text-[#0A0A0A] antialiased font-body">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S04HN8RH2F"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-S04HN8RH2F');
        `}</Script>
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
