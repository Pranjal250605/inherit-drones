import { useT } from "../../i18n";
import { Mono, SectionHead, TSection, DroneGlyph } from "./primitives";

/* TacticalTechnology (#technology) — the IH-04 airframe, presented calmly:
   the drone alone in space, with key specs as large type. No HUD chrome. */
export function TacticalTechnology() {
  const { t } = useT();

  return (
    <TSection id="technology">
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* the airframe, alone in space */}
        <div data-tac="up" className="order-1 flex flex-col items-center lg:order-2">
          <DroneGlyph className="h-56 w-56 text-white/85 drop-shadow-[0_0_40px_rgba(249,115,22,0.18)] lg:h-72 lg:w-72" />
          <Mono className="mt-8">
            {t.tech.hud_name_top} · {t.tech.hud_name_sn}
          </Mono>
        </div>

        <div className="order-2 lg:order-1">
          <SectionHead
            eyebrow={t.tech.tag}
            jp={t.tech.subtitle_jp}
            lead={t.tech.lead}
          >
            <span className="block">
              {t.tech.h2_pre}
              <span className="text-orange-500">{t.tech.h2_emph}</span>
              {t.tech.h2_post}
            </span>
            <span className="block text-white/80">{t.tech.h2_line2}</span>
          </SectionHead>

          <div
            data-tac="stagger"
            className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3"
          >
            {t.tech.specs.map((spec) => (
              <div key={spec.k} data-tac-item>
                <div className="font-display text-3xl font-bold tracking-[-0.02em] text-white">
                  {spec.display}
                  {spec.unit ? (
                    <span className="ml-1 text-[15px] font-medium text-orange-500">
                      {spec.unit}
                    </span>
                  ) : null}
                </div>
                <div className="mt-2 text-[12px] uppercase tracking-[0.14em] text-white/40">
                  {spec.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TSection>
  );
}
