import { useT } from "../../i18n";
import { SectionHead, TSection } from "./primitives";

/* TacticalSolutions (#solutions) — three capabilities as large editorial rows.
   Metrics are kept but collapsed to one quiet line so the row stays calm. */
export function TacticalSolutions() {
  const { t } = useT();

  return (
    <TSection id="solutions">
      <SectionHead
        eyebrow={t.solutions.tag}
        jp={t.solutions.subtitle_jp}
        lead={t.solutions.lead}
      >
        <span className="block">{t.solutions.h2_line1}</span>
        <span className="block">
          <span className="text-orange-500">{t.solutions.h2_emph}</span>
          {t.solutions.h2_line2_post}
        </span>
        <span className="block text-white/80">{t.solutions.h2_line3}</span>
      </SectionHead>

      <div data-tac="stagger" className="mt-28 border-t border-white/10">
        {t.solutions.cards.map((card, i) => (
          <a
            key={card.id}
            href="#contact"
            data-tac-item
            className="group grid gap-y-4 border-b border-white/10 py-12 transition lg:grid-cols-12 lg:items-baseline lg:gap-x-8"
          >
            <span className="font-mono text-[13px] tracking-[0.2em] text-orange-500 lg:col-span-1">
              0{i + 1}
            </span>

            <h3 className="font-display text-3xl font-bold uppercase leading-none tracking-[-0.02em] text-white transition group-hover:text-orange-400 sm:text-4xl lg:col-span-5">
              {card.title}
            </h3>

            <p className="text-[16px] leading-relaxed text-white/55 lg:col-span-4">
              {card.desc}
            </p>

            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35 lg:col-span-2 lg:text-right">
              {card.metrics.map((m) => `${m[1]}`).join(" · ")}
            </span>
          </a>
        ))}
      </div>
    </TSection>
  );
}
