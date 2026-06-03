import type { ReactNode } from "react";
import { ArrowRight, SectionFrame, TickMark } from "../primitives";
import { useT, type Dict } from "../../i18n";

type SolutionCardData = Dict["solutions"]["cards"][number];

/* Node positions on the ring (centres, as % of the square container).
   Equilateral triangle: apex at top, base across the bottom. */
const NODE_POS = [
  { top: "13%", left: "50%" },
  { top: "68.5%", left: "18%" },
  { top: "68.5%", left: "82%" },
];

const LINK_ICONS: ReactNode[] = [
  // technology
  <svg key="t" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" className="h-full w-full">
    <rect x="10" y="10" width="12" height="12" rx="1" />
    <path d="M13 6v4M19 6v4M13 22v4M19 22v4M6 13h4M6 19h4M22 13h4M22 19h4" />
  </svg>,
  // operations
  <svg key="o" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" className="h-full w-full">
    <circle cx="7" cy="16" r="3" />
    <circle cx="25" cy="8" r="3" />
    <circle cx="25" cy="24" r="3" />
    <path d="M10 15l12-6M10 17l12 6" />
  </svg>,
  // field
  <svg key="f" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" className="h-full w-full">
    <path d="M16 28s9-8.5 9-15a9 9 0 10-18 0c0 6.5 9 15 9 15z" />
    <circle cx="16" cy="13" r="3" />
  </svg>,
  // contact
  <svg key="c" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" className="h-full w-full">
    <rect x="5" y="8" width="22" height="16" rx="1.5" />
    <path d="M6 9l10 8 10-8" />
  </svg>,
];

export function Solutions() {
  const { t } = useT();
  const s = t.solutions;
  const cards = s.cards;
  const links = [
    { label: t.header.nav.technology, href: "#technology" },
    { label: t.header.nav.operations, href: "#process" },
    { label: t.header.nav.field, href: "#field" },
    { label: t.header.nav.contact, href: "#contact" },
  ];

  return (
    <SectionFrame
      id="solutions"
      className="diag-bottom relative overflow-hidden bg-gradient-to-br from-[#F2861A] via-[#E9810F] to-[#DB780C] py-24 text-white [--diag:3.5rem] md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* LEFT — heading + numbered cards */}
          <div>
            <div className="flex items-center gap-3">
              <TickMark colorClass="text-white" />
              <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-white/90">
                {s.tag.includes(" / ") ? s.tag.split(" / ")[1] : s.tag}
              </span>
            </div>

            <h2
              data-anim="title-up"
              className="mt-6 max-w-xl font-display text-4xl font-bold leading-[1.04] tracking-[-0.03em] md:text-6xl"
            >
              {s.h2_line1} {s.h2_emph}
              {s.h2_line2_post} {s.h2_line3}
            </h2>
            <p className="mt-6 max-w-md text-pretty text-[15px] leading-relaxed text-white/85">
              {s.lead}
            </p>

            <div data-anim="stagger" className="mt-10 flex flex-col gap-4">
              {cards.map((c, i) => (
                <div key={c.id} data-anim-item>
                  <SolutionCard card={c} index={i} cta={s.card_cta} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — circular node diagram */}
          <div data-anim="stagger" className="relative mx-auto aspect-square w-full max-w-[460px]">
            {/* ring */}
            <div className="absolute left-1/2 top-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/45" />
            {/* centre label */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-none">
              <div className="font-display text-xl font-bold tracking-[0.02em] md:text-2xl">
                {s.center_a}
              </div>
              <div className="mt-1 font-display text-2xl font-bold tracking-[-0.01em] md:text-3xl">
                {s.center_b}
              </div>
            </div>
            {/* nodes */}
            {cards.map((c, i) => (
              <div
                key={c.id}
                data-anim-item
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: NODE_POS[i]?.top, left: NODE_POS[i]?.left }}
              >
                <div className="glass-dark grid h-28 w-28 place-items-center rounded-full text-center transition-transform duration-300 hover:scale-105 md:h-32 md:w-32">
                  <div>
                    <div className="font-mono text-[11px] font-bold text-orange-300">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-1 px-2 font-display text-sm font-bold leading-tight text-white md:text-base">
                      {c.short}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* bottom icon-link row */}
        <div className="mt-16 grid grid-cols-2 border-t border-white/20 sm:grid-cols-4 md:mt-20">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className={
                "group flex flex-col items-center gap-3 px-4 py-8 text-center transition-colors " +
                (i % 2 === 1 ? "border-l border-white/20 " : "") +
                (i >= 2 ? "border-t border-white/20 sm:border-t-0 " : "") +
                "sm:border-l sm:first:border-l-0"
              }
            >
              <span className="h-9 w-9 text-white/90 transition-transform duration-300 group-hover:scale-110">
                {LINK_ICONS[i]}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-bold tracking-[0.04em]">
                {l.label}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

function SolutionCard({
  card,
  index,
  cta,
}: {
  card: SolutionCardData;
  index: number;
  cta: string;
}) {
  return (
    <a
      href="#contact"
      className="card-lift glass-dark group block rounded-xl p-5 text-white md:p-6"
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm font-bold text-orange-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-lg font-bold leading-tight tracking-[-0.01em] transition-colors group-hover:text-orange-300 md:text-xl">
          {card.title}
        </h3>
      </div>
      <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">
        {card.desc}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5">
        {card.metrics.map(([k, v]) => (
          <span key={k} className="inline-flex items-baseline gap-1.5">
            <span className="font-mono text-[12px] font-bold text-white">{v}</span>
            <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-white/50">
              {k}
            </span>
          </span>
        ))}
        <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-300 opacity-0 transition-opacity group-hover:opacity-100">
          {cta}
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </a>
  );
}
