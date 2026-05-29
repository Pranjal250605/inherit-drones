import type { ReactNode } from "react";
import { RoundArrow, SectionFrame, SectionLabel } from "../primitives";
import { useT, type Dict } from "../../i18n";

type SolutionCardData = Dict["solutions"]["cards"][number];

const ICONS: ReactNode[] = [
  <svg
    key="logistics"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className="h-full w-full"
  >
    <path d="M8 18l16-8 16 8-16 8L8 18z" />
    <path d="M8 18v12l16 8 16-8V18" />
    <path d="M24 26v12" />
    <path d="M16 14l16 8" />
  </svg>,
  <svg
    key="inspect"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className="h-full w-full"
  >
    <circle cx="24" cy="24" r="10" />
    <circle cx="24" cy="24" r="3" />
    <path d="M24 4v6M24 38v6M4 24h6M38 24h6" />
    <path d="M10 10l4 4M34 34l4 4M38 10l-4 4M14 34l-4 4" />
  </svg>,
  <svg
    key="survey"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className="h-full w-full"
  >
    <path d="M4 38l12-14 8 8 12-16 8 10" />
    <path d="M4 38h40" />
    <circle cx="36" cy="14" r="2" />
  </svg>,
];

export function Solutions() {
  const { t } = useT();
  const cards = t.solutions.cards;

  return (
    <SectionFrame id="solutions" className="bg-bg-alt py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionLabel>{t.solutions.tag}</SectionLabel>
              <h2
                data-anim="title-up"
                className="mt-6 font-display text-4xl font-bold leading-[1.04] tracking-[-0.03em] md:text-6xl"
              >
                {t.solutions.h2_line1} {t.solutions.h2_emph}
                {t.solutions.h2_line2_post} {t.solutions.h2_line3}
              </h2>
              <div className="mt-5 font-jp text-[12px] tracking-[0.08em] text-fg/50">
                {t.solutions.subtitle_jp}
              </div>
              <p className="mt-8 max-w-sm text-pretty text-[15px] leading-relaxed text-muted">
                {t.solutions.lead}
              </p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div data-anim="stagger" className="flex flex-col">
              {cards.map((c, i) => (
                <div key={c.id} data-anim-item>
                  <SolutionCard card={c} icon={ICONS[i]} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function SolutionCard({
  card,
  icon,
}: {
  card: SolutionCardData;
  icon: ReactNode;
}) {
  return (
    <a
      href="#contact"
      className="group block border-t-2 border-fg/10 py-10 transition-colors hover:border-orange-500"
    >
      <div className="flex items-start gap-6">
        <div className="mt-1 h-10 w-10 shrink-0 text-orange-500 transition md:h-12 md:w-12">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-2xl font-bold leading-[1.08] tracking-[-0.02em] transition group-hover:text-orange-500 md:text-3xl">
            {card.title}
          </h3>
          <p className="mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-muted">
            {card.desc}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-3">
            {card.metrics.map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-2">
                <span className="font-display text-lg font-bold text-fg">{v}</span>
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-fg/50">
                  {k}
                </span>
              </div>
            ))}
            <RoundArrow className="ml-auto" size="h-9 w-9" />
          </div>
        </div>
      </div>
    </a>
  );
}
