import { SectionLabel } from "../primitives";
import { DroneGlyph } from "../tactical/primitives";
import { useT, type Dict } from "../../i18n";

type Spec = Dict["tech"]["specs"][number];

/* Technology — four-zone command row (matches the reference layout):
   [ heading + lead ] · [ gold 隼 calligraphy ] · [ 3 key specs ] · [ drone panel ] */
export function Technology() {
  const { t } = useT();
  const specs = t.tech.specs.slice(0, 3);

  return (
    <section
      id="technology"
      className="topo-bg relative w-full overflow-hidden bg-bg-alt py-24 md:py-32"
    >
      <div className="mx-auto max-w-[87.5rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:items-center lg:gap-x-8">
          {/* 1 — heading + lead */}
          <div className="lg:col-span-4">
            <SectionLabel>{t.tech.tag}</SectionLabel>
            <h2
              data-anim="title-up"
              className="mt-6 font-display text-5xl font-bold leading-[1.04] tracking-[-0.02em] text-fg md:text-6xl lg:text-[4.5rem]"
            >
              {t.tech.h2_pre}
              <span className="text-orange-500">{t.tech.h2_emph}</span>
              {t.tech.h2_post}
              <br />
              {t.tech.h2_line2}
            </h2>
            <p className="mt-7 max-w-md text-pretty text-lg leading-relaxed text-muted md:text-xl">
              {t.tech.lead}
            </p>
          </div>

          {/* 2 — 隼 = "Hayabusa", brush calligraphy (Yuji Syuku) in metallic gold */}
          <div className="flex justify-center lg:col-span-2">
            <span
              aria-hidden="true"
              className="select-none bg-gradient-to-br from-[#e7c879] via-[#b8924a] to-[#7c5d22] bg-clip-text font-brush text-[8rem] leading-[0.78] text-transparent sm:text-[10rem] lg:text-[11rem]"
            >
              隼
            </span>
          </div>

          {/* 3 — three key specs */}
          <div
            data-anim="stagger"
            className="grid grid-cols-3 gap-5 lg:col-span-2 lg:flex lg:flex-col lg:gap-12"
          >
            {specs.map((s) => (
              <SpecStat key={s.k} spec={s} />
            ))}
          </div>

          {/* 4 — drone in a light instrument panel */}
          <div className="lg:col-span-4">
            <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-3xl border border-fg/[0.06] bg-gradient-to-br from-white to-[#f0e8de] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.45)]">
              {/* warm ambient glow behind the drone */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(58% 58% at 50% 46%, rgba(249,115,22,0.20), transparent 70%)",
                }}
              />
              <DroneGlyph className="relative h-[80%] w-[80%] text-[#0a0c11] drop-shadow-[0_12px_34px_rgba(249,115,22,0.28)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecStat({ spec }: { spec: Spec }) {
  return (
    <div data-anim-item className="text-center lg:text-left">
      <div className="font-display text-3xl font-bold leading-none tracking-[-0.02em] text-fg sm:text-4xl lg:text-5xl">
        {spec.display}
        {spec.unit && (
          <span className="ml-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-orange-500 sm:text-sm">
            {spec.unit}
          </span>
        )}
      </div>
      <div className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-fg/50 sm:text-[11px] sm:tracking-[0.18em]">
        {spec.k}
      </div>
    </div>
  );
}
