import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        surface: "#F7F7F7",
        border: "#E5E5E5",
        text: "#1A1A1A",
        muted: "#6B6B6B",
        subtle: "#AAAAAA",
        accent: "#A3FF00",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3rem,7vw,6rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        section: ["clamp(2rem,4vw,3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
    },
  },
  plugins: [],
};

export default config;
