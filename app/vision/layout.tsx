import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Vision | LEVEL7",
  description:
    "Every business is a building. LEVEL7 is the elevator: from the free Lobby diagnostic to Floor 7, where the business runs without you. Take the ride.",
};

export default function VisionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
