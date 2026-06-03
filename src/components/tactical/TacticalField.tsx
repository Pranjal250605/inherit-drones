import { useT } from "../../i18n";
import { SectionHead, TSection, GhostButton } from "./primitives";

/* TacticalField (#field) — selected deployments as large rows, each anchored
   by one headline number. Quiet, editorial, lots of air. */
export function TacticalField() {
  const { t } = useT();

  return (
    <TSection id="field">
      <SectionHead
        eyebrow={t.field.tag}
        jp={t.field.subtitle_jp}
      >
        {t.field.h2_pre}
        <span className="text-orange-500">{t.field.h2_emph}</span>
        {t.field.h2_post}
      </SectionHead>

      <div data-tac="stagger" className="mt-24 border-t border-white/10">
        {t.field.cases.map((c) => (
          <div
            key={c.code}
            data-tac-item
            className="grid gap-y-6 border-b border-white/10 py-12 lg:grid-cols-12 lg:items-center lg:gap-x-10"
          >
            <div className="lg:col-span-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-orange-500">
                {c.tag}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold uppercase leading-tight tracking-[-0.02em] text-white sm:text-3xl">
                {c.title}
              </h3>
              <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-white/55">
                {c.body}
              </p>
            </div>

            <div className="lg:col-span-5 lg:text-right">
              <div className="font-display text-5xl font-bold tracking-[-0.02em] text-orange-500 sm:text-6xl">
                {c.stat_value}
              </div>
              <div className="mt-2 text-[13px] uppercase tracking-[0.14em] text-white/40">
                {c.stat_label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div data-tac="up" className="mt-20">
        <GhostButton href="#contact">{t.field.cta}</GhostButton>
      </div>
    </TSection>
  );
}
