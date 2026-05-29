import { SectionFrame, SectionLabel } from "../primitives";
import { useT, type Dict } from "../../i18n";

type Spec = Dict["tech"]["specs"][number];

export function Technology() {
  const { t } = useT();

  return (
    <SectionFrame id="technology" className="bg-bg-alt py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          <div id="fleet" className="col-span-12 lg:col-span-6">
            <SectionLabel>{t.tech.tag}</SectionLabel>
            <h2
              data-anim="title-up"
              className="mt-6 font-display text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-fg md:text-6xl"
            >
              {t.tech.h2_pre}
              {t.tech.h2_emph}
              {t.tech.h2_post}
              <br />
              {t.tech.h2_line2}
            </h2>
            <div className="mt-5 font-jp text-[12px] tracking-[0.08em] text-fg/50">
              {t.tech.subtitle_jp}
            </div>
            <p className="mt-8 max-w-xl text-pretty text-[15px] leading-relaxed text-muted md:text-base">
              {t.tech.lead}
            </p>

            <div className="mt-10 flex flex-wrap gap-2.5">
              {t.tech.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-fg/15 bg-bg px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-fg/65"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <figure className="overflow-hidden rounded-2xl">
              <div
                data-anim="reveal"
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-fg/10 bg-gradient-to-br from-bg to-bg-alt shadow-sm"
              >
                <div className="absolute inset-0 grid place-items-center">
                  <DronePlaceholder />
                </div>
              </div>
            </figure>
          </div>
        </div>

        <div
          data-anim="stagger"
          className="mt-20 grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2 md:mt-28 md:grid-cols-3"
        >
          {t.tech.specs.map((s) => (
            <div key={s.k} data-anim-item>
              <SpecBar {...s} />
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

function SpecBar({ k, v, unit, display }: Spec) {
  return (
    <div className="group border-t-2 border-fg/10 pt-6">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold leading-none tracking-[-0.02em] text-fg md:text-5xl">
          {display}
        </span>
        {unit && (
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-500">
            {unit}
          </span>
        )}
      </div>
      <div className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/55">
        {k}
      </div>
      <div className="relative mt-4 h-[3px] w-full rounded-full bg-fg/10">
        <div
          data-bar={v}
          className="absolute bottom-0 left-0 h-[3px] rounded-full bg-orange-500"
          style={{ width: 0 }}
        />
      </div>
    </div>
  );
}

function DronePlaceholder() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="relative z-10 h-2/3 w-2/3 text-fg/55"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <line x1="100" y1="100" x2="40" y2="40" />
      <line x1="100" y1="100" x2="160" y2="40" />
      <line x1="100" y1="100" x2="40" y2="160" />
      <line x1="100" y1="100" x2="160" y2="160" />
      <rect x="80" y="80" width="40" height="40" />
      <circle cx="100" cy="100" r="6" />
      {(
        [
          [40, 40],
          [160, 40],
          [40, 160],
          [160, 160],
        ] as Array<[number, number]>
      ).map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="18" className="text-fg/25" />
          <circle cx={x} cy={y} r="3" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}
