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
        paper: "#FBFBF8",
        panel: "#FFFFFF",
        panel2: "#F3F3EE",
        line: "#E4E4DD",
        lineStrong: "#0A0A0A",
        ink: "#141414",
        bg: "#FBFBF8",
        cream: "#F6F6F2",
        surface: "#F3F3EE",
        border: "#E4E4DD",
        text: "#0A0A0A",
        muted: "#63635C",
        subtle: "#A9A9A0",
        faint: "#A9A9A0",
        accent: "#A3FF00",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        satoshi: ["Satoshi", "var(--font-body)", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3.4rem,9vw,10rem)", { lineHeight: "0.9" }],
        section: ["clamp(2.6rem,5.5vw,4.8rem)", { lineHeight: "0.92" }],
      },
    },
  },
  plugins: [],
};

export default config;
