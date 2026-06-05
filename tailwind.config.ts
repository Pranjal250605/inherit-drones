import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        /* Type system:
           - display: Satoshi — geometric, premium grotesk for headlines.
           - sans: Manrope — clean modern body text. (Satoshi + Manrope pairing.)
           - mono: Space Mono — instrumentation monospace for the technical
             eyebrow/label motif.
           - jp: Zen Kaku Gothic New — Japanese body text.
           - brush: Yuji Syuku — Japanese brush-calligraphy for emphasised key
             words (font-brush), giving select kanji extra impact.
           The JP body face is chained as a fallback on the Latin families so
           Japanese glyphs inside display/body text render in Zen Kaku, not the
           OS default. */
        sans: ['"Manrope"', '"Zen Kaku Gothic New"', "system-ui", "sans-serif"],
        display: ['"Satoshi"', '"Zen Kaku Gothic New"', "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
        jp: ['"Zen Kaku Gothic New"', "system-ui", "sans-serif"],
        brush: ['"Yuji Syuku"', '"Zen Kaku Gothic New"', "serif"],
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
