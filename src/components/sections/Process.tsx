import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, SectionFrame, SectionLabel } from "../primitives";
import { useT } from "../../i18n";

gsap.registerPlugin(ScrollTrigger);

const CARD_GRADIENTS = [
  "from-[#FF6133] to-[#FF3717]",
  "from-[#F2861A] to-[#DB780C]",
  "from-[#FF6133] to-[#E0500C]",
  "from-[#E08410] to-[#C96A00]",
];

export function Process() {
  const { t } = useT();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.innerWidth < 768;

    if (reduced || narrow) return;

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - section.clientWidth;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getDistance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame id="process" className="relative bg-bg">
      {/* Header: not pinned — sits above the pinned scroll zone */}
      <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-12 md:py-32">
        <header className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <SectionLabel>{t.process.tag}</SectionLabel>
            <h2
              data-anim="title-up"
              className="mt-6 font-display text-5xl font-bold leading-[1.04] tracking-[-0.03em] text-fg md:text-7xl"
            >
              {t.process.h2_line1}{" "}
              <em className="not-italic text-orange-500">{t.process.h2_emph}</em>{" "}
              {t.process.h2_line2}
            </h2>
            <div className="mt-5 font-jp text-[12px] tracking-[0.08em] text-fg/50">
              {t.process.subtitle_jp}
            </div>
          </div>
          <a
            href="#contact"
            className="group mt-6 inline-flex items-center gap-3 whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.18em] text-fg/80 transition-colors hover:text-orange-500 md:mt-0"
          >
            {t.process.cta}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-white transition group-hover:bg-orange-400">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </header>
      </div>

      {/* Scroll-pinned horizontal track */}
      <div
        ref={sectionRef}
        className="overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-6 pb-20 md:flex-row md:flex-nowrap md:gap-8 md:px-12 md:pb-32 lg:px-16"
        >
          {t.process.steps.map((s, i) => (
            <div
              key={s.n}
              className={[
                "group relative flex min-w-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-8 shadow-2xl shadow-black/20 transition-transform duration-300 hover:-translate-y-1 md:min-w-[480px] md:p-12 lg:min-w-[560px]",
                CARD_GRADIENTS[i % CARD_GRADIENTS.length],
              ].join(" ")}
              style={{ minHeight: "520px" }}
            >
              {/* Decorative watermark number */}
              <div className="pointer-events-none absolute -right-6 -top-4 select-none">
                <span className="font-display text-[11rem] font-bold leading-none tracking-tighter text-white/10 md:text-[14rem]">
                  0{i + 1}
                </span>
              </div>

              {/* Top: phase label */}
              <div className="relative z-10 flex items-center gap-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
                  Phase 0{i + 1}
                </span>
              </div>

              {/* Middle: jp kicker + title */}
              <div className="relative z-10 mt-auto">
                <p className="font-jp text-[11px] tracking-[0.1em] text-white/50">{s.jp}</p>
                <h3 className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-white md:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-white/75">{s.body}</p>
              </div>

              {/* Bottom: big number accent */}
              <div className="relative z-10 mt-10 flex items-end justify-between">
                <span className="font-display text-6xl font-bold leading-none text-white/20 md:text-7xl">
                  0{i + 1}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                  Sys.Ready
                </span>
              </div>
            </div>
          ))}
          {/* trailing spacer — extends the horizontal travel so the slide reads
              as the dominant motion (and the last card fully clears) */}
          <div aria-hidden="true" className="hidden shrink-0 md:block md:min-w-[24vw]" />
        </div>
      </div>
    </SectionFrame>
  );
}
