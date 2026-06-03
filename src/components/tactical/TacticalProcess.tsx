import { useT } from "../../i18n";
import { SectionHead, TSection, GhostButton } from "./primitives";

/* TacticalProcess (#process) — four phases as a calm numbered grid. */
export function TacticalProcess() {
  const { t } = useT();

  return (
    <TSection id="process">
      <SectionHead eyebrow={t.process.tag} jp={t.process.subtitle_jp}>
        <span className="block">{t.process.h2_line1}</span>
        <span className="block text-orange-500">{t.process.h2_emph}</span>
        <span className="block text-white/80">{t.process.h2_line2}</span>
      </SectionHead>

      <div
        data-tac="stagger"
        className="mt-28 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
      >
        {t.process.steps.map((step, i) => (
          <div key={step.n} data-tac-item className="border-t border-white/10 pt-7">
            <span className="font-mono text-[13px] tracking-[0.2em] text-orange-500">
              0{i + 1}
            </span>
            <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-[-0.01em] text-white">
              {step.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/55">
              {step.body}
            </p>
          </div>
        ))}
      </div>

      <div data-tac="up" className="mt-20">
        <GhostButton href="#contact">{t.process.cta}</GhostButton>
      </div>
    </TSection>
  );
}
