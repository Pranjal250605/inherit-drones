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

/* Four distinct drone-themed line-arts, one per phase. Hand-drawn SVG (single
   stroke colour via currentColor) so they stay crisp and on-brand. */
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

/* 01 — Discover: top-down survey quadcopter */
function DroneTopDown({ className = "" }: ArtProps) {
  const motors: Array<[number, number]> = [
    [48, 48],
    [152, 48],
    [48, 152],
    [152, 152],
  ];
  return (
    <svg {...SVG_BASE} className={className}>
      <path d="M100 100L48 48M100 100L152 48M100 100L48 152M100 100L152 152" />
      {motors.map(([cx, cy], k) => (
        <g key={k}>
          <circle cx={cx} cy={cy} r="24" />
          <ellipse cx={cx} cy={cy} rx="22" ry="6" />
          <ellipse cx={cx} cy={cy} rx="6" ry="22" />
          <circle cx={cx} cy={cy} r="4" />
        </g>
      ))}
      <rect x="74" y="74" width="52" height="52" rx="15" />
      <path d="M91 74q9 -12 18 0" />
      <circle cx="100" cy="100" r="7" />
    </svg>
  );
}

/* 02 — Engineer: drone with a dashed flight path to a target waypoint */
function DroneFlightPath({ className = "" }: ArtProps) {
  const m: Array<[number, number]> = [
    [40, 40],
    [78, 40],
    [40, 78],
    [78, 78],
  ];
  return (
    <svg {...SVG_BASE} className={className}>
      <path d="M59 59L40 40M59 59L78 40M59 59L40 78M59 59L78 78" />
      {m.map(([cx, cy], k) => (
        <g key={k}>
          <circle cx={cx} cy={cy} r="9" />
          <circle cx={cx} cy={cy} r="2.4" />
        </g>
      ))}
      <rect x="51" y="51" width="16" height="16" rx="4" />
      <path d="M72 72C112 94 122 124 150 150" strokeDasharray="3 8" />
      <circle cx="150" cy="150" r="12" />
      <path d="M150 132v10M150 158v10M132 150h10M158 150h10" />
      <circle cx="150" cy="150" r="3" />
    </svg>
  );
}

/* 03 — Operate: ground remote controller emitting a signal */
function DroneRemote({ className = "" }: ArtProps) {
  return (
    <svg {...SVG_BASE} className={className}>
      <line x1="66" y1="76" x2="58" y2="52" />
      <line x1="134" y1="76" x2="142" y2="52" />
      <path d="M150 46q9 7 0 16" />
      <path d="M159 39q16 14 0 30" />
      <rect x="52" y="76" width="96" height="66" rx="16" />
      <rect x="80" y="84" width="40" height="22" rx="3" />
      <circle cx="74" cy="124" r="11" />
      <circle cx="126" cy="124" r="11" />
      <circle cx="74" cy="124" r="3" />
      <circle cx="126" cy="124" r="3" />
    </svg>
  );
}

/* 04 — Deliver: side-view drone carrying a package */
function DroneDelivery({ className = "" }: ArtProps) {
  return (
    <svg {...SVG_BASE} className={className}>
      <line x1="36" y1="52" x2="80" y2="52" />
      <line x1="120" y1="52" x2="164" y2="52" />
      <line x1="58" y1="52" x2="58" y2="68" />
      <line x1="142" y1="52" x2="142" y2="68" />
      <line x1="52" y1="68" x2="148" y2="68" />
      <rect x="80" y="62" width="40" height="22" rx="7" />
      <line x1="86" y1="84" x2="78" y2="120" />
      <line x1="114" y1="84" x2="122" y2="120" />
      <rect x="76" y="120" width="48" height="40" rx="4" />
      <line x1="76" y1="140" x2="124" y2="140" />
      <line x1="100" y1="120" x2="100" y2="140" />
    </svg>
  );
}

const DRONE_ARTS = [DroneTopDown, DroneFlightPath, DroneRemote, DroneDelivery];

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
      // Cards fly in from off the right edge of the screen, one after another.
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
          {t.process.steps.map((s, i) => {
            const Art = DRONE_ARTS[i % DRONE_ARTS.length] ?? DroneTopDown;
            return (
            <div
              key={s.n}
              data-card
              className="group relative flex min-h-[400px] flex-col justify-between overflow-hidden rounded-3xl p-8 text-white shadow-xl shadow-black/15 transition-transform duration-300 hover:-translate-y-1.5 md:min-h-[460px] md:p-9"
              style={{ background: CARD_GRADIENTS[i % CARD_GRADIENTS.length] }}
            >
              {/* per-phase drone line art watermark */}
              <Art className="pointer-events-none absolute -right-8 -top-8 h-52 w-52 text-white/20 transition-transform duration-700 group-hover:scale-110" />

              <span className="relative z-10 font-mono text-[12px] font-bold uppercase tracking-[0.24em] text-white/70">
                Phase 0{i + 1}
              </span>

              <div className="relative z-10">
                <p className="font-jp text-[13px] tracking-[0.1em] text-white/60">
                  {s.jp}
                </p>
                <h3 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-white md:text-5xl">
                  {s.title}
                </h3>
                <p className="mt-4 text-[17px] leading-relaxed text-white/85 md:text-lg">
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
