import type { ReactNode } from "react";
import {
  ArrowRight,
  BracketTitle,
  CornerBrackets,
  JpAnno,
  Mono,
  SectionFrame,
  Tag,
} from "../primitives";
import { useT, type Dict } from "../../i18n";

type SolutionCardData = Dict["solutions"]["cards"][number];

const OFFSETS = [0, 6, 12];

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
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-32">
              <Tag>{t.solutions.tag}</Tag>
              <h2
                data-anim="title-up"
                className="mt-8 font-display text-3xl font-light leading-[1.15] tracking-[-0.015em] md:text-4xl"
              >
                {t.solutions.h2_line1}
                <br />
                <span className="italic text-orange-400">
                  {t.solutions.h2_emph}
                </span>
                {t.solutions.h2_line2_post}
                <br />
                {t.solutions.h2_line3}
              </h2>
              <div className="mt-5 font-jp text-[11px] tracking-[0.05em] text-fg/30">
                {t.solutions.subtitle_jp}
              </div>
              <p className="mt-8 max-w-sm text-pretty text-sm leading-loose text-muted">
                {t.solutions.lead}
              </p>

              <div className="mt-10 grid grid-cols-2 gap-3 border-t border-fg/10 pt-6">
                <div>
                  <Mono>{t.solutions.stat_pillars}</Mono>
                  <div className="mt-2 font-display text-3xl font-light">03</div>
                </div>
                <div>
                  <Mono>{t.solutions.stat_active}</Mono>
                  <div className="mt-2 font-display text-3xl font-light text-orange-400">
                    03
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 lg:col-span-8">
            <div data-anim="card-stagger" className="flex flex-col gap-6">
              {cards.map((c, i) => (
                <div
                  key={c.id}
                  data-anim-item
                  className="md:pl-[var(--offset)]"
                  style={{ ["--offset" as string]: `${(OFFSETS[i] ?? 0) * 4}px` }}
                >
                  <SolutionCard
                    card={c}
                    icon={ICONS[i]}
                    statusLabel={t.solutions.card_status}
                    ctaLabel={t.solutions.card_cta}
                  />
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
  statusLabel,
  ctaLabel,
}: {
  card: SolutionCardData;
  icon: ReactNode;
  statusLabel: string;
  ctaLabel: string;
}) {
  return (
    <a
      href="#contact"
      className="group relative block overflow-hidden border border-fg/10 bg-bg p-8 transition-all duration-300 hover:border-orange-400/50 hover:bg-fg hover:text-bg lg:p-10"
    >
      <CornerBrackets />

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Mono className="text-orange-400/80 group-hover:text-orange-400">
            {card.code}
          </Mono>
          <JpAnno className="group-hover:text-bg/40">{card.jp}</JpAnno>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/30 group-hover:text-bg/40">
          {statusLabel}
        </span>
      </div>

      <div className="mt-10 grid grid-cols-12 items-start gap-6">
        <div className="col-span-2 text-fg/60 group-hover:text-bg">
          <div className="h-12 w-12 lg:h-14 lg:w-14">{icon}</div>
        </div>
        <div className="col-span-10">
          <h3 className="font-display text-2xl font-light leading-[1.15] tracking-[-0.015em] md:text-3xl">
            <BracketTitle>{card.title}</BracketTitle>
          </h3>
          <p className="mt-4 max-w-md text-pretty text-sm leading-loose text-muted group-hover:text-bg/70">
            {card.desc}
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-fg/10 pt-6 group-hover:border-bg/10">
        <div className="flex flex-wrap gap-8">
          {card.metrics.map(([k, v]) => (
            <div key={k}>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40 group-hover:text-bg/50">
                {k}
              </div>
              <div className="mt-1 font-mono text-base text-fg group-hover:text-bg">
                {v}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40 transition group-hover:text-orange-400">
          <span className="whitespace-nowrap">{ctaLabel}</span>{" "}
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>

      <div className="mt-6 max-h-0 overflow-hidden font-mono text-[10px] uppercase tracking-[0.22em] text-orange-400/0 transition-all duration-300 group-hover:max-h-10 group-hover:text-orange-400">
        {">> "}
        {card.hidden}
      </div>
    </a>
  );
}
