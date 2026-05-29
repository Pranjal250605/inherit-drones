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

const TONES = ["bg-[#F15A29]", "bg-[#E08410]"];

export function Promo() {
  const { t } = useT();
  const items = t.promo.items;

  return (
    <SectionFrame id="promo" className="bg-bg-alt py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
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
  tone: string;
}) {
  return (
    <a
      href={item.href}
      className={
        "group card-lift relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-2xl p-8 text-white shadow-xl shadow-black/10 hover:shadow-2xl md:p-10 " +
        tone
      }
    >
      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/40 p-2.5 text-white">
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
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 transition group-hover:bg-white/25">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}
