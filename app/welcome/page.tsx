import type { Metadata } from "next";
import WelcomeContent from "./WelcomeContent";

/*
 * The after-lead page. Sent to leads right after they leave their details,
 * so its one job is to set expectations and build trust before the first call.
 */

export const metadata: Metadata = {
  title: "Welcome to LEVEL7 | What Happens Next",
  description:
    "Here's exactly who you're about to talk to, how LEVEL7 works, and what happens after you reach out, so your first call already feels like the second one.",
  alternates: {
    canonical: "https://thelevel7.ai/welcome",
  },
};

export default function WelcomePage() {
  return <WelcomeContent />;
}
