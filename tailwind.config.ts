import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        /* Fujitaka type system: Lexend Deca (Latin) + Noto Sans JP (Japanese).
           `mono` is intentionally repointed to Lexend Deca so the existing
           uppercase tracked "eyebrow" labels read as clean corporate small-caps
           rather than instrumentation monospace. */
        sans: ['"Lexend Deca"', "system-ui", "sans-serif"],
        display: ['"Lexend Deca"', "system-ui", "sans-serif"],
        mono: ['"Lexend Deca"', "system-ui", "sans-serif"],
        jp: ['"Noto Sans JP"', "system-ui", "sans-serif"],
      },
      colors: {
        /* Semantic theme tokens — backed by CSS variables in src/index.css.
           Components must use these (bg, bg-alt, fg, muted, accent) so the
           page works in every theme variant. */
        bg: "rgb(var(--bg) / <alpha-value>)",
        "bg-alt": "rgb(var(--bg-alt) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",

        /* Legacy literal colors — kept only so we don't break any inline
           tokens we missed. Should not be used in new code. */
        ink: { 950: "#05070b", 900: "#0a0d14" },
      },
    },
  },
  plugins: [],
} satisfies Config;
