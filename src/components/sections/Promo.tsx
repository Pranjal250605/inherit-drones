import type { ReactNode } from "react";
import { ArrowRight, SectionFrame } from "../primitives";
import { useT, type Dict } from "../../i18n";

type PromoItem = Dict["promo"]["items"][number];

const ICONS: ReactNode[] = [
  <svg
    key="demo"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className="h-full w-full"
  >
    <circle cx="24" cy="24" r="4" />
    <path d="M24 4v8M24 36v8M4 24h8M36 24h8" />
    <path d="M10 10l6 6M32 32l6 6M38 10l-6 6M16 32l-6 6" />
    <circle cx="24" cy="24" r="14" strokeDasharray="2 3" />
  </svg>,
  <svg
    key="event"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className="h-full w-full"
  >
    <rect x="6" y="10" width="36" height="32" />
    <path d="M6 18h36" />
    <path d="M14 6v8M34 6v8" />
    <path d="M14 26h6v6h-6zM24 26h6v6h-6z" />
  </svg>,
];

type Tone = { base: string; flood: string; arrow: string };

/* Fujitaka product-card palette: a bright base that floods to a deeper shade
   on hover, with the corner arrow flipping to white + base-colored glyph. */
const TONES: Tone[] = [
  { base: "bg-[#FF6133]", flood: "bg-[#FF3717]", arrow: "group-hover:text-[#FF3717]" },
  { base: "bg-[#DE8500]", flood: "bg-[#D36F00]", arrow: "group-hover:text-[#D36F00]" },
];

export function Promo() {
  const { t } = useT();
  const items = t.promo.items;

  return (
    <SectionFrame id="promo" className="bg-bg-alt py-16 md:py-20">
      <div className="mx-auto max-w-[87.5rem] px-6 lg:px-12">
        <div
          data-anim="stagger"
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {items.map((item, i) => (
            <div key={item.kind} data-anim-item>
              <PromoBanner item={item} icon={ICONS[i]} tone={TONES[i % TONES.length]} />
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

function PromoBanner({
  item,
  icon,
  tone,
}: {
  item: PromoItem;
  icon: ReactNode;
  tone: Tone;
}) {
  return (
    <div className="group/wrapper relative">
      {/* Persona-style dynamic offset shadow */}
      <div
        className={
          "absolute inset-0 -z-10 translate-x-[6px] translate-y-[6px] transition-transform duration-500 group-hover/wrapper:translate-x-[10px] group-hover/wrapper:translate-y-[10px] " +
          tone.flood
        }
        style={{
          clipPath: "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))",
        }}
      />
      
      <a
        href={item.href}
        className={
          "group relative flex min-h-[220px] flex-col overflow-hidden text-white transition-transform duration-500 group-hover/wrapper:-translate-y-1 group-hover/wrapper:-translate-x-1 " +
          tone.base
        }
        style={{
          clipPath: "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))",
        }}
      >
        {/* Ink-flood: a circle anchored behind the corner arrow that scales up to
            wash the whole card in the deeper shade — Fujitaka's signature hover. */}
        <span
          aria-hidden="true"
          className={
            "pointer-events-none absolute bottom-7 right-7 h-16 w-16 scale-0 rounded-full transition-transform duration-[650ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:scale-[26] " +
            tone.flood
          }
        />

      <div className="relative z-10 flex flex-1 flex-col justify-between p-8 md:p-10">
        <div className="flex items-center justify-between">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/40 p-2.5 text-white transition-transform duration-500 group-hover:scale-110">
            {icon}
          </span>
          <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/80">
            {item.kind}
          </span>
        </div>

        <div className="mt-8">
          <h3 className="font-display text-2xl font-bold leading-[1.15] tracking-[-0.01em] md:text-3xl">
            {item.title}
          </h3>
          <div className="mt-3 text-[13px] font-medium tracking-[0.02em] text-white/85">
            {item.schedule}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-[13px] font-semibold tracking-[0.02em]">
            {item.cta}
          </span>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition-colors duration-500 group-hover:bg-white">
            <ArrowRight
              className={
                "h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 " +
                tone.arrow
              }
            />
          </span>
        </div>
      </div>
    </a>
    </div>
  );
}
