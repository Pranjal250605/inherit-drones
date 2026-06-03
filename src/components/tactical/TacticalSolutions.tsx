import { useT } from "../../i18n";
import { Mono, Eyebrow, TSection, ArrowRight, Brackets } from "./primitives";

/* TacticalSolutions (#solutions) — three solution cards with metrics,
   active status indicator, and HUD corner brackets. */
export function TacticalSolutions() {
  const { t } = useT();

  return (
    <TSection id="solutions" index="S.02">
      {/* Eyebrow */}
      <Eyebrow className="mb-12">{t.solutions.tag}</Eyebrow>

      {/* Headline + lead block */}
      <div data-tac="up" className="max-w-4xl">
        <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white md:text-5xl lg:text-6xl">
          <span className="block">{t.solutions.h2_line1}</span>
          <span className="block">
            <span className="text-orange-500">{t.solutions.h2_emph}</span>
            {t.solutions.h2_line2_post}
          </span>
          <span className="block text-white/80">{t.solutions.h2_line3}</span>
        </h2>

        <div className="mt-6 flex items-center gap-4">
          <span className="h-px w-8 bg-orange-500/60" />
          <span className="font-jp text-[13px] tracking-[0.22em] text-white/45">
            {t.solutions.subtitle_jp}
          </span>
        </div>

        <p className="mt-8 max-w-xl text-pretty text-[15px] leading-relaxed text-white/55">
          {t.solutions.lead}
        </p>
      </div>

      {/* Solution cards */}
      <div
        data-tac="stagger"
        className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {t.solutions.cards.map((card) => (
          <div
            key={card.id}
            data-tac-item
            className="group relative flex flex-col gap-6 border border-white/10 bg-white/[0.03] p-8 transition hover:border-white/20 hover:bg-white/[0.05]"
          >
            {/* HUD corner brackets */}
            <Brackets />

            {/* Code + jp row */}
            <div className="flex items-center justify-between">
              <Mono>{card.code}</Mono>
              <span className="font-jp text-[11px] tracking-[0.2em] text-white/35">
                {card.jp}
              </span>
            </div>

            {/* Hairline */}
            <span className="block h-px w-full bg-white/10" />

            {/* Title */}
            <h3 className="font-display text-xl font-bold uppercase tracking-[-0.01em] text-white md:text-2xl">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-pretty text-[14px] leading-relaxed text-white/55">
              {card.desc}
            </p>

            {/* Metrics */}
            <ul className="mt-auto space-y-2.5 border-t border-white/10 pt-6">
              {card.metrics.map((m, i) => (
                <li key={i} className="flex items-baseline justify-between">
                  <Mono className="text-white/40">{m[0]}</Mono>
                  <span className="font-mono text-[13px] font-semibold tracking-[0.08em] text-orange-400">
                    {m[1]}
                  </span>
                </li>
              ))}
            </ul>

            {/* Card footer */}
            <div className="flex items-center justify-between border-t border-white/10 pt-5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 blink" />
                <Mono>{t.solutions.card_status}</Mono>
              </div>
              <a
                href={`#solutions-${card.id}`}
                className="group/link inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/45 transition hover:text-orange-400"
              >
                {t.solutions.card_cta}
                <ArrowRight className="h-3 w-3 transition group-hover/link:translate-x-0.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </TSection>
  );
}
