import { useT } from "../../i18n";
import { Mono, Eyebrow, TSection } from "./primitives";

/* TacticalMission (#mission) — three-pillar ideology grid.
   Cinematic, sparse: oversized headline, Japanese rule, hairline-framed
   pillar cards with an orange top tick and mono code labels. */
export function TacticalMission() {
  const { t } = useT();

  return (
    <TSection id="mission" index="S.01">
      {/* Eyebrow */}
      <Eyebrow className="mb-12">{t.mission.tag}</Eyebrow>

      {/* Headline block */}
      <div data-tac="up" className="max-w-4xl">
        <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white md:text-5xl lg:text-6xl">
          {t.mission.h2_pre}
          <span className="text-orange-500">{t.mission.h2_emph}</span>
          {t.mission.h2_post}
        </h2>

        <div className="mt-6 flex items-center gap-4">
          <span className="h-px w-8 bg-orange-500/60" />
          <span className="font-jp text-[13px] tracking-[0.22em] text-white/45">
            {t.mission.subtitle_jp}
          </span>
        </div>
      </div>

      {/* Pillar cards */}
      <div
        data-tac="stagger"
        className="mt-20 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3"
      >
        {t.mission.pillars.map((pillar) => (
          <div
            key={pillar.code}
            data-tac-item
            className="group relative flex flex-col gap-5 bg-[#04060a] p-8 transition hover:bg-white/[0.03]"
          >
            {/* Orange top tick — the single accent per card */}
            <span className="absolute left-8 top-0 h-px w-10 bg-orange-500 transition-all group-hover:w-16" />

            {/* Code + jp kicker row */}
            <div className="flex items-center justify-between pt-4">
              <Mono>{pillar.code}</Mono>
              <span className="font-jp text-[11px] tracking-[0.2em] text-white/35">
                {pillar.jp}
              </span>
            </div>

            {/* Divider hairline */}
            <span className="block h-px w-full bg-white/10" />

            {/* Title */}
            <h3 className="font-display text-lg font-bold uppercase tracking-[-0.01em] text-white md:text-xl">
              {pillar.title}
            </h3>

            {/* Body */}
            <p className="text-pretty text-[14px] leading-relaxed text-white/55">
              {pillar.body}
            </p>
          </div>
        ))}
      </div>
    </TSection>
  );
}
