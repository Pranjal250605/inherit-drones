import { useEffect, useState } from "react";
import { ArrowRight } from "../primitives";
import { useT } from "../../i18n";
import { useTheme } from "../../theme";
import hiroshimaAerial from "../../assets/hiroshima-aerial.jpg";
import droneSpraying from "../../assets/drone-spraying.jpg";
import teamNapa from "../../assets/team-napa.jpg";

/* Fujitaka-style full-bleed photo carousel — auto-advancing slides with a slow
   Ken Burns zoom, centered messaging, minimal chrome. Kept distinct from
   Fujitaka with the Inherit orange accent, JP/EN slide captions and an orange
   segmented progress indicator. */
const SLIDES = [
  { img: hiroshimaAerial, jp: "瀬戸内", en: "SETOUCHI" },
  { img: droneSpraying, jp: "現場", en: "FIELD OPS" },
  { img: teamNapa, jp: "広島", en: "HIROSHIMA" },
];

export function Hero() {
  const { t } = useT();
  const { theme } = useTheme();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % SLIDES.length),
      5500
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      data-theme="dark"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-bg text-fg"
    >
      {/* crossfading photo carousel */}
      {SLIDES.map((s, i) => (
        <div
          key={s.en}
          aria-hidden={i !== active}
          className={
            "absolute inset-0 -z-20 transition-opacity duration-[1200ms] ease-out " +
            (i === active ? "opacity-100" : "opacity-0")
          }
        >
          <img
            src={s.img}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className={
              "h-full w-full object-cover " + (i === active ? "hero-kenburns" : "")
            }
          />
        </div>
      ))}

      {/* legibility wash + fade into the page below */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            theme === "light"
              ? "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.32) 45%, rgba(0,0,0,0.55) 78%, rgb(var(--page-bg)) 100%)"
              : "linear-gradient(to bottom, rgb(var(--bg) / 0.55) 0%, rgb(var(--bg) / 0.32) 45%, rgb(var(--bg) / 0.6) 78%, rgb(var(--page-bg)) 100%)",
        }}
      />

      {/* centered messaging */}
      <div
        data-hero="content"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
      >
        <div
          data-hero="tag"
          className="mb-7 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white/75"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          {t.hero.tag_brand} · {t.hero.tag_country}
        </div>

        <h1
          data-hero="title"
          className="font-display text-[3.25rem] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl lg:text-[6rem]"
        >
          <span className="block">
            {t.hero.h1_line1_pre}
            <span className="text-orange-400">{t.hero.h1_line1_emph}</span>
          </span>
          <span className="block text-white/90">
            {t.hero.h1_line2_pre}
            {t.hero.h1_line2_emph}
          </span>
        </h1>

        <div
          data-hero="rule"
          className="mt-7 flex items-center gap-4 font-jp text-[12px] tracking-[0.22em] text-white/55"
        >
          <span className="h-px w-10 bg-orange-500" />
          {t.hero.rule_jp}
          <span className="h-px w-10 bg-orange-500" />
        </div>

        <p
          data-hero="paragraph"
          className="mt-7 max-w-lg text-pretty text-[15px] leading-relaxed text-white/75 md:text-base"
        >
          {t.hero.paragraph}
        </p>

        <div data-hero="ctas" className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#solutions"
            className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full border border-white/30 px-7 py-3.5 text-[13px] font-bold tracking-[0.03em] text-white backdrop-blur-md transition duration-300 hover:border-white/45 hover:brightness-110"
            style={{
              background:
                "linear-gradient(135deg, rgba(249,115,22,0.82) 0%, rgba(234,88,12,0.68) 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.45), 0 12px 34px -10px rgba(249,115,22,0.55)",
            }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent"
            />
            <span className="relative z-10">{t.hero.cta_primary}</span>
            <ArrowRight className="relative z-10 h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </a>
          <a
            href="#technology"
            className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-medium tracking-[0.04em] text-white/85 backdrop-blur-sm transition hover:border-white/50 hover:text-white"
          >
            {t.hero.cta_secondary}
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* slide caption + segmented progress indicator */}
      <div className="absolute inset-x-0 bottom-8 z-10 mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/70">
          <span className="font-jp">{SLIDES[active]?.jp}</span>
          <span className="text-white/40">/ {SLIDES[active]?.en}</span>
        </div>
        <div className="flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.en}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-1 w-10 overflow-hidden rounded-full bg-white/25"
            >
              <span
                className={
                  "block h-full rounded-full bg-orange-500 transition-all duration-500 " +
                  (i === active ? "w-full" : "w-0")
                }
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
