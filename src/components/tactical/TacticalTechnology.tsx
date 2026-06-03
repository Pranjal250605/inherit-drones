import { useT } from "../../i18n";
import { Mono, Eyebrow, TSection, Brackets, DroneGlyph } from "./primitives";

/* TacticalTechnology — IH-04 airframe specs with animated bars and HUD panel. */
export function TacticalTechnology() {
  const { t } = useT();

  return (
    <TSection id="technology" index="04">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        {/* ── LEFT COLUMN ── */}
        <div data-tac="up">
          <Eyebrow>{t.tech.tag}</Eyebrow>

          <h2 className="mt-8 font-display text-4xl font-bold uppercase leading-[0.92] tracking-[-0.02em] text-white md:text-6xl">
            <span className="block">
              {t.tech.h2_pre}
              <span className="text-orange-500">{t.tech.h2_emph}</span>
              {t.tech.h2_post}
            </span>
            <span className="block text-white/80">{t.tech.h2_line2}</span>
          </h2>

          <div className="mt-5 flex items-center gap-4">
            <span className="h-px w-8 bg-orange-500" />
            <span className="font-jp text-[12px] tracking-[0.24em] text-white/45">
              {t.tech.subtitle_jp}
            </span>
          </div>

          <p className="mt-7 max-w-lg text-pretty text-[15px] leading-relaxed text-white/55">
            {t.tech.lead}
          </p>

          {/* Spec bars */}
          <div className="mt-10 space-y-5" data-tac="stagger">
            {t.tech.specs.map((spec) => (
              <div key={spec.k} data-tac-item>
                <div className="mb-1.5 flex items-baseline justify-between">
                  <Mono>{spec.k}</Mono>
                  <span className="font-mono text-[12px] font-semibold tracking-[0.12em] text-orange-400">
                    {spec.display}
                    {spec.unit ? <span className="ml-1 text-white/35">{spec.unit}</span> : null}
                  </span>
                </div>
                <div className="h-1 w-full overflow-hidden bg-white/10">
                  <div
                    className="h-full bg-orange-500"
                    style={{ width: 0 }}
                    data-tac-bar={String(spec.v)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Capability chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {t.tech.chips.map((chip) => (
              <span
                key={chip}
                className="border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-white/55"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN — HUD PANEL ── */}
        <div data-tac="up" className="flex flex-col gap-6">
          <div className="relative overflow-hidden border border-white/10 bg-white/[0.03] p-8">
            <Brackets />

            {/* Scanline sweep */}
            <div className="scanline absolute inset-x-0 top-0 h-px bg-orange-500/60" />

            {/* Top-left readout */}
            <div className="absolute left-5 top-5">
              <Mono className="block text-white/55">{t.tech.hud_name_top}</Mono>
              <Mono className="block">{t.tech.hud_name_sn}</Mono>
            </div>

            {/* Top-right readout */}
            <div className="absolute right-5 top-5 text-right">
              <Mono className="block">{t.tech.hud_hover}</Mono>
              <Mono className="block">{t.tech.hud_lock}</Mono>
            </div>

            {/* Centred drone glyph */}
            <div className="flex items-center justify-center py-20">
              <DroneGlyph className="h-40 w-40 text-white/80" spinning />
            </div>

            {/* Bottom-left readout */}
            <div className="absolute bottom-5 left-5">
              <Mono className="block">{t.tech.hud_bat}</Mono>
              <Mono className="block">{t.tech.hud_rx}</Mono>
            </div>

            {/* Bottom-right status with blink */}
            <div className="absolute bottom-5 right-5 flex items-center gap-2">
              <span className="blink h-1.5 w-1.5 rounded-full bg-orange-500" />
              <Mono>{t.tech.hud_status}</Mono>
            </div>
          </div>

          {/* Sub-spec row */}
          <div className="grid grid-cols-3 gap-px border border-white/10 bg-white/10">
            {t.tech.sub_specs.map(([k, v]) => (
              <div key={k} className="bg-[#04060a] px-4 py-3">
                <Mono className="block">{k}</Mono>
                <span className="mt-1 block font-mono text-[11px] tracking-[0.1em] text-white/70">
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TSection>
  );
}
