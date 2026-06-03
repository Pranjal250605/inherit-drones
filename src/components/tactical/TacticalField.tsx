import { useT } from "../../i18n";
import { Mono, Eyebrow, TSection, GhostButton, ArrowRight, Brackets } from "./primitives";

/* TacticalField — three field deployment case studies in staggered bordered panels. */
export function TacticalField() {
  const { t } = useT();

  return (
    <TSection id="field" index="05">
      {/* Header */}
      <div data-tac="up" className="max-w-3xl">
        <Eyebrow>{t.field.tag}</Eyebrow>

        <h2 className="mt-8 font-display text-4xl font-bold uppercase leading-[0.92] tracking-[-0.02em] text-white md:text-6xl">
          <span className="block">
            {t.field.h2_pre}
            <span className="text-orange-500">{t.field.h2_emph}</span>
            {t.field.h2_post}
          </span>
        </h2>

        <div className="mt-5 flex items-center gap-4">
          <span className="h-px w-8 bg-orange-500" />
          <span className="font-jp text-[12px] tracking-[0.24em] text-white/45">
            {t.field.subtitle_jp}
          </span>
        </div>
      </div>

      {/* Case panels */}
      <div className="mt-14 grid gap-5 lg:grid-cols-3" data-tac="stagger">
        {t.field.cases.map((c) => (
          <div
            key={c.code}
            data-tac-item
            className="relative flex flex-col gap-5 border border-white/10 bg-white/[0.03] p-6"
          >
            <Brackets />

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3">
              <Mono className="text-white/55">{c.code}</Mono>
              <span className="border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.28em] text-orange-400">
                {c.tag}
              </span>
              <Mono className="ml-auto text-right">{c.coords}</Mono>
            </div>

            {/* Title & body */}
            <div>
              <h3 className="font-display text-[18px] font-bold uppercase leading-tight tracking-[-0.01em] text-white">
                {c.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/55">{c.body}</p>
            </div>

            {/* Stat */}
            <div className="border-t border-white/10 pt-4">
              <div className="font-display text-3xl font-bold text-orange-500 md:text-4xl">
                {c.stat_value}
              </div>
              <Mono className="mt-1">{c.stat_label}</Mono>
            </div>

            {/* Footer row */}
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="blink h-1.5 w-1.5 rounded-full bg-orange-500" />
                <Mono>{t.field.rec_label}</Mono>
              </div>
              <a
                href="#contact"
                className="group flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/55 transition hover:text-orange-400"
              >
                {t.field.open}
                <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 flex justify-start" data-tac="up">
        <GhostButton href="#contact">{t.field.cta}</GhostButton>
      </div>
    </TSection>
  );
}
