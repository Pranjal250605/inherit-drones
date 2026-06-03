import { useT } from "../../i18n";
import { SectionHead, TSection } from "./primitives";

/* TacticalMission (#mission) — one statement, three calm pillars. */
export function TacticalMission() {
  const { t } = useT();

  return (
    <TSection id="mission">
      <SectionHead eyebrow={t.mission.tag} jp={t.mission.subtitle_jp}>
        {t.mission.h2_pre}
        <span className="text-orange-500">{t.mission.h2_emph}</span>
        {t.mission.h2_post}
      </SectionHead>

      <div
        data-tac="stagger"
        className="mt-28 grid gap-x-12 gap-y-16 sm:grid-cols-3"
      >
        {t.mission.pillars.map((pillar, i) => (
          <div key={pillar.code} data-tac-item>
            <span className="font-mono text-[13px] tracking-[0.2em] text-orange-500">
              0{i + 1}
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-[-0.01em] text-white">
              {pillar.title}
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-white/55">
              {pillar.body}
            </p>
          </div>
        ))}
      </div>
    </TSection>
  );
}
