import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        bg: "#FFFFFF",
        cream: "#F6F6F2",
        surface: "#F6F6F2",
        border: "#E8E8E3",
        text: "#0A0A0A",
        muted: "#5C5C5C",
        subtle: "#AAAAAA",
        accent: "#A3FF00",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        satoshi: ["Satoshi", "var(--font-body)", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3.5rem,9vw,8.5rem)", { lineHeight: "0.92" }],
        section: ["clamp(2.5rem,5.5vw,4.5rem)", { lineHeight: "0.95" }],
      },
    },
  },
  plugins: [],
};

export default config;
