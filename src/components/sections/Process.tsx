import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, SectionFrame, SectionLabel } from "../primitives";
import { useT } from "../../i18n";

gsap.registerPlugin(ScrollTrigger);

const CARD_TINTS = [
  "hover:border-orange-500/40 hover:shadow-[0_0_40px_rgb(var(--brand-500)/0.15)]",
  "hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
  "hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]",
  "hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]"
];

/* Four distinct abstract geometry line-arts, one per phase. */
type ArtProps = { className?: string };
const SVG_BASE = {
  viewBox: "0 0 200 200",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/* 01 — Discover: Complex intersecting data nodes and telemetry rings */
function AbstractNodes({ className = "" }: ArtProps) {
  return (
    <svg {...SVG_BASE} className={className}>
      <circle cx="100" cy="100" r="70" strokeDasharray="4 8" strokeOpacity="0.5" />
      <circle cx="100" cy="100" r="40" strokeWidth="1" strokeOpacity="0.3" />
      <path d="M30 100 L170 100 M100 30 L100 170" strokeWidth="1" strokeOpacity="0.2" />
      <path d="M60 60 L140 140 M60 140 L140 60" strokeWidth="1" strokeOpacity="0.2" />
      
      <circle cx="60" cy="60" r="8" fill="currentColor" />
      <circle cx="140" cy="60" r="12" />
      <circle cx="60" cy="140" r="6" />
      <circle cx="140" cy="140" r="16" strokeDasharray="2 4" />
      
      <path d="M60 60 L100 80 L140 60 L120 100 L140 140 L100 120 L60 140 L80 100 Z" />
      <rect x="94" y="94" width="12" height="12" transform="rotate(45 100 100)" />
      
      <path d="M15 15 L35 15 L35 35" strokeWidth="1" />
      <path d="M185 185 L165 185 L165 165" strokeWidth="1" />
    </svg>
  );
}

/* 02 — Engineer: Isometric wireframe projections and measurement ticks */
function AbstractGeometry({ className = "" }: ArtProps) {
  return (
    <svg {...SVG_BASE} className={className}>
      <path d="M20 20 L180 20 L180 180 L20 180 Z" strokeWidth="1" strokeOpacity="0.2" />
      <path d="M20 100 L180 100 M100 20 L100 180" strokeWidth="1" strokeDasharray="2 6" strokeOpacity="0.4" />
      
      <path d="M100 40 L150 70 L150 130 L100 160 L50 130 L50 70 Z" />
      <path d="M100 40 L100 100 M50 70 L100 100 M150 70 L100 100 M100 160 L100 100" />
      
      <circle cx="100" cy="100" r="15" />
      <circle cx="100" cy="100" r="4" fill="currentColor" />
      <ellipse cx="100" cy="70" rx="30" ry="15" strokeWidth="1" strokeOpacity="0.6" />
      
      <path d="M10 40 L25 40 M10 70 L20 70 M10 100 L30 100 M10 130 L20 130 M10 160 L25 160" strokeWidth="1.5" />
      <path d="M160 10 L160 25 M130 10 L130 20 M100 10 L100 30 M70 10 L70 20 M40 10 L40 25" strokeWidth="1.5" />
    </svg>
  );
}

/* 03 — Operate: Frequency waveforms and signal interference patterns */
function AbstractWaveform({ className = "" }: ArtProps) {
  return (
    <svg {...SVG_BASE} className={className}>
      <path d="M20 100 Q 40 20, 60 100 T 100 100 T 140 100 T 180 100" strokeWidth="3" />
      <path d="M20 100 Q 40 180, 60 100 T 100 100 T 140 100 T 180 100" strokeWidth="1" strokeOpacity="0.5" />
      <path d="M20 100 Q 60 60, 100 100 T 180 100" strokeWidth="1" strokeDasharray="4 4" />
      
      <circle cx="60" cy="100" r="4" fill="currentColor" />
      <circle cx="140" cy="100" r="4" fill="currentColor" />
      <circle cx="100" cy="100" r="8" />
      
      <path d="M130 40 L150 40 L150 60 M150 40 L140 50" strokeWidth="1.5" />
      <circle cx="140" cy="50" r="2" />
      
      <path d="M40 80 L40 120 M80 60 L80 140 M120 70 L120 130 M160 90 L160 110" strokeWidth="4" strokeOpacity="0.3" strokeLinecap="square" />
    </svg>
  );
}

/* 04 — Deliver: Orbital trajectories and vector forces */
function AbstractOrbitals({ className = "" }: ArtProps) {
  return (
    <svg {...SVG_BASE} className={className}>
      <circle cx="100" cy="100" r="25" />
      <circle cx="100" cy="100" r="10" fill="currentColor" />
      
      <ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(30 100 100)" strokeOpacity="0.7" />
      <ellipse cx="100" cy="100" rx="60" ry="20" transform="rotate(-60 100 100)" strokeDasharray="6 6" />
      
      <circle cx="169" cy="140" r="8" fill="currentColor" />
      <circle cx="70" cy="48" r="5" />
      
      <path d="M100 100 L180 40" strokeWidth="1" strokeDasharray="2 4" />
      <path d="M180 40 L170 40 M180 40 L180 50" strokeWidth="1.5" />
      <circle cx="180" cy="40" r="3" />
      
      <path d="M100 100 L40 160" strokeWidth="1" strokeDasharray="2 4" />
      <rect x="35" y="155" width="10" height="10" transform="rotate(45 40 160)" />
      
      <path d="M10 100 A 90 90 0 0 1 100 10" strokeWidth="2" strokeOpacity="0.3" />
      <path d="M190 100 A 90 90 0 0 1 100 190" strokeWidth="2" strokeOpacity="0.3" />
    </svg>
  );
}

const DRONE_ARTS = [AbstractNodes, AbstractGeometry, AbstractWaveform, AbstractOrbitals];

export function Process() {
  const { t } = useT();
  const rowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", row);
      gsap.fromTo(
        cards,
        { autoAlpha: 0, x: () => window.innerWidth * 0.9 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: row, start: "top 82%", once: true },
        }
      );
    }, row);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame id="process" className="relative overflow-hidden bg-bg py-24 md:py-32">
      {/* Massive Abstract Architectural Background Shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center opacity-[0.03]">
        <svg viewBox="0 0 1000 1000" className="absolute w-[150vw] min-w-[1200px] animate-[spin_120s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="500" cy="500" r="400" />
          <circle cx="500" cy="500" r="300" strokeDasharray="10 20" />
          <circle cx="500" cy="500" r="200" />
          <line x1="100" y1="500" x2="900" y2="500" />
          <line x1="500" y1="100" x2="500" y2="900" />
          <line x1="217" y1="217" x2="783" y2="783" />
          <line x1="217" y1="783" x2="783" y2="217" />
          <rect x="250" y="250" width="500" height="500" transform="rotate(45 500 500)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[93.75rem] px-6 lg:px-12">
        <header className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <SectionLabel>{t.process.tag}</SectionLabel>
            <h2
              data-anim="title-up"
              className="mt-6 font-display text-[3.75rem] font-bold leading-[1.04] tracking-[-0.03em] text-fg md:text-[4.7rem] lg:text-[4.7rem]"
            >
              {t.process.h2_line1}
              <span className="not-italic text-orange-500">{t.process.h2_emph}</span>
              {t.process.h2_line2}
            </h2>
            <div className="mt-5 font-jp text-[17px] tracking-[0.08em] text-fg/50">
              {t.process.subtitle_jp}
            </div>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 whitespace-nowrap text-[15px] font-bold uppercase tracking-[0.18em] text-fg/80 transition-colors hover:text-orange-500"
          >
            {t.process.cta}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-white transition-all duration-300 group-hover:scale-[1.3] group-hover:bg-orange-400 group-hover:shadow-[0_0_20px_rgb(var(--brand-500)/0.5)]">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </header>

        <div
          ref={rowRef}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.process.steps.map((s, i) => {
            const Art = DRONE_ARTS[i % DRONE_ARTS.length] ?? AbstractNodes;
            return (
            <div
              key={s.n}
              data-card
              className={`group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl p-7 text-fg border border-white/5 bg-black/20 backdrop-blur-md shadow-2xl transition-all duration-500 hover:-translate-y-2 sm:min-h-[400px] sm:p-8 md:min-h-[460px] md:p-9 ${CARD_TINTS[i % CARD_TINTS.length]}`}
            >
              {/* per-phase drone line art watermark */}
              <Art className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 text-fg/5 transition-transform duration-700 group-hover:scale-110 group-hover:text-fg/10" />

              <span className="relative z-10 font-mono text-[15px] font-bold uppercase tracking-[0.24em] text-fg/40 group-hover:text-fg/80 transition-colors duration-500">
                Phase 0{i + 1}
              </span>

              <div className="relative z-10">
                <p className="font-jp text-[14px] font-bold tracking-[0.1em] text-fg/40">
                  {s.jp}
                </p>
                <h3 className="mt-4 font-display text-[2.8rem] font-bold leading-[1.05] tracking-tight text-fg md:text-[3.75rem]">
                  {s.title}
                </h3>
                <p className="mt-5 min-h-[5.5rem] text-[19px] leading-relaxed text-muted line-clamp-3 md:text-[1.25rem]">
                  {s.body}
                </p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </SectionFrame>
  );
}
