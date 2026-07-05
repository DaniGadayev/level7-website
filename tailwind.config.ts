import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0A0A0A",
        panel: "#101010",
        panel2: "#161616",
        line: "#242424",
        lineStrong: "#3A3A3A",
        ink: "#141414",
        bg: "#0A0A0A",
        cream: "#F6F6F2",
        surface: "#101010",
        border: "#242424",
        text: "#F4F4F0",
        muted: "#9C9C96",
        subtle: "#62625C",
        faint: "#62625C",
        accent: "#A3FF00",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        satoshi: ["Satoshi", "var(--font-body)", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3.6rem,10vw,10rem)", { lineHeight: "0.9" }],
        section: ["clamp(2.6rem,5.5vw,4.8rem)", { lineHeight: "0.92" }],
      },
    },
  },
  plugins: [],
};

export default config;
