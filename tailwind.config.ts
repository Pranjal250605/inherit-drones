import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        /* Distinctive type system (2024 editorial-grotesk pairing):
           - display: Bricolage Grotesque — characterful optical-size grotesk for
             headlines; gives the page personality so it doesn't read "generic".
           - sans: Hanken Grotesk — clean, warm humanist body text.
           - mono: Space Mono — true instrumentation monospace for the technical
             eyebrow/label motif (engineering character, not generic small-caps).
           - jp: Zen Kaku Gothic New. */
        sans: ['"Hanken Grotesk"', "system-ui", "sans-serif"],
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
        jp: ['"Zen Kaku Gothic New"', "system-ui", "sans-serif"],
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
