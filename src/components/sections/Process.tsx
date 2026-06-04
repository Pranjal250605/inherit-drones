import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, SectionFrame, SectionLabel } from "../primitives";
import { useT } from "../../i18n";

gsap.registerPlugin(ScrollTrigger);

const CARD_GRADIENTS = [
  "linear-gradient(155deg,#FF6A33,#EA3D0C)",
  "linear-gradient(155deg,#F7951B,#E07407)",
  "linear-gradient(155deg,#FB5E28,#D8410B)",
  "linear-gradient(155deg,#F2A516,#E07A00)",
];

/* Faint top-down quadcopter line art — gives each card a subject. */
function DroneLineArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="60" y1="60" x2="28" y2="28" />
      <line x1="60" y1="60" x2="92" y2="28" />
      <line x1="60" y1="60" x2="28" y2="92" />
      <line x1="60" y1="60" x2="92" y2="92" />
      <circle cx="28" cy="28" r="14" />
      <circle cx="92" cy="28" r="14" />
      <circle cx="28" cy="92" r="14" />
      <circle cx="92" cy="92" r="14" />
      <rect x="49" y="49" width="22" height="22" rx="4" />
      <circle cx="60" cy="60" r="3.5" />
    </svg>
  );
}

export function Process() {
  const { t } = useT();
  const rowRef = useRef<HTMLDivElement>(null);

  /* Cards slide in (from the right, staggered) when the row is reached. No pin /
     horizontal scroll — the heading + all four cards sit on screen together. */
  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", row);
      gsap.fromTo(
        cards,
        { autoAlpha: 0, x: 70 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: row, start: "top 80%", once: true },
        }
      );
    }, row);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame id="process" className="dot-grid-bg relative overflow-hidden bg-bg py-16 md:py-20">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <header className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <SectionLabel>{t.process.tag}</SectionLabel>
            <h2
              data-anim="title-up"
              className="mt-5 font-display text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-fg md:text-5xl lg:text-6xl"
            >
              {t.process.h2_line1}{" "}
              <em className="not-italic text-orange-500">{t.process.h2_emph}</em>{" "}
              {t.process.h2_line2}
            </h2>
            <div className="mt-4 font-jp text-[12px] tracking-[0.08em] text-fg/50">
              {t.process.subtitle_jp}
            </div>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.18em] text-fg/80 transition-colors hover:text-orange-500"
          >
            {t.process.cta}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-white transition group-hover:bg-orange-400">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </header>

        <div
          ref={rowRef}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.process.steps.map((s, i) => (
            <div
              key={s.n}
              data-card
              className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl p-7 text-white shadow-xl shadow-black/15 transition-transform duration-300 hover:-translate-y-1.5 md:min-h-[330px]"
              style={{ background: CARD_GRADIENTS[i % CARD_GRADIENTS.length] }}
            >
              {/* drone line art watermark */}
              <DroneLineArt className="pointer-events-none absolute -right-5 -top-5 h-36 w-36 text-white/20 transition-transform duration-500 group-hover:rotate-45" />

              <span className="relative z-10 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white/70">
                Phase 0{i + 1}
              </span>

              <div className="relative z-10">
                <p className="font-jp text-[12px] tracking-[0.1em] text-white/60">
                  {s.jp}
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-white md:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/85">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
