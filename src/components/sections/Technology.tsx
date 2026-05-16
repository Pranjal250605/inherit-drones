import { CornerBrackets, Mono, SectionFrame, Tag } from "../primitives";
import { useT, type Dict } from "../../i18n";

type Spec = Dict["tech"]["specs"][number];

export function Technology() {
  const { t } = useT();

  return (
    <SectionFrame id="technology" className="overflow-hidden bg-bg-alt py-24 md:py-32">
      <div className="absolute inset-0 micro-grid opacity-40" />

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-12 gap-10 px-6 lg:gap-16 lg:px-10">
        <div id="fleet" className="col-span-12 lg:col-span-7">
          <Tag>{t.tech.tag}</Tag>
          <h2
            data-anim="title-up"
            className="mt-8 font-display text-3xl font-light leading-[1.15] tracking-[-0.015em] md:text-4xl"
          >
            {t.tech.h2_pre}
            <span className="italic text-orange-400">{t.tech.h2_emph}</span>
            {t.tech.h2_post}
            <br />
            {t.tech.h2_line2}
          </h2>
          <div className="mt-5 font-jp text-[11px] tracking-[0.05em] text-fg/30">
            {t.tech.subtitle_jp}
          </div>
          <p className="mt-8 max-w-lg text-pretty text-sm leading-loose text-muted">
            {t.tech.lead}
          </p>

          <div className="mt-12 space-y-5">
            {t.tech.specs.map((s) => (
              <SpecBar key={s.k} {...s} />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {t.tech.chips.map((chip) => (
              <span
                key={chip}
                className="border border-fg/15 bg-fg/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/60"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="relative">
            <div className="relative aspect-square w-full overflow-hidden border border-fg/15 bg-gradient-to-br from-fg/[0.04] to-transparent cut-corner">
              <CornerBrackets />

              <div className="absolute inset-0 grid place-items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-orange-400/20"
                    style={{ width: `${i * 22}%`, height: `${i * 22}%` }}
                  />
                ))}
                {[0, 1, 2].map((i) => (
                  <div
                    key={"p" + i}
                    className="radar-ring absolute h-1/2 w-1/2 rounded-full border border-orange-400/40"
                    style={{ animationDelay: `${i * 1}s` }}
                  />
                ))}
                <div className="absolute left-1/2 top-0 h-full w-px bg-fg/5" />
                <div className="absolute left-0 top-1/2 h-px w-full bg-fg/5" />
                <svg className="sweep absolute h-full w-full" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="sweepg" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="rgba(249,115,22,0.0)" />
                      <stop offset="100%" stopColor="rgba(249,115,22,0.30)" />
                    </linearGradient>
                  </defs>
                  <path d="M50 50 L 50 0 A 50 50 0 0 1 100 50 Z" fill="url(#sweepg)" />
                </svg>
                <DronePlaceholder />
              </div>

              <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/45">
                <div>{t.tech.hud_name_top}</div>
                <div>{t.tech.hud_name_sn}</div>
              </div>
              <div className="absolute right-4 top-4 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-fg/45">
                <div>{t.tech.hud_hover}</div>
                <div>{t.tech.hud_lock}</div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-fg/45">
                <span>{t.tech.hud_bat}</span>
                <span className="text-orange-400/90">{t.tech.hud_status}</span>
                <span>{t.tech.hud_rx}</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {t.tech.sub_specs.map(([k, v]) => (
                <div key={k} className="relative border border-fg/10 bg-fg/[0.03] p-3">
                  <Mono>{k}</Mono>
                  <div className="mt-1 font-mono text-[13px] text-fg">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function SpecBar({ k, v, unit, display }: Spec) {
  return (
    <div className="group">
      <div className="flex items-baseline justify-between">
        <span className="flex items-center gap-3 text-sm text-fg/80">
          <span className="font-mono text-[10px] tracking-[0.22em] text-fg/30">[ ]</span>
          {k}
        </span>
        <span className="font-mono text-base tracking-tight text-fg">
          {display}{" "}
          <span className="ml-0.5 text-[10px] font-normal text-fg/40">{unit}</span>
        </span>
      </div>
      <div className="relative mt-2 h-2">
        <div className="absolute inset-x-0 top-0 flex justify-between">
          {Array.from({ length: 11 }).map((_, i) => (
            <span key={i} className="h-1 w-px bg-fg/15" />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px w-full bg-fg/10" />
        <div
          data-bar={v}
          className="absolute bottom-0 h-px bg-orange-500"
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
      className="relative z-10 h-2/3 w-2/3 text-fg/85"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
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
          <circle cx={x} cy={y} r="18" className="text-fg/40" />
          <circle cx={x} cy={y} r="3" fill="currentColor" />
          <line x1={x - 18} y1={y} x2={x + 18} y2={y} stroke="#f97316" />
        </g>
      ))}
      <circle cx="100" cy="78" r="2.5" fill="#f97316" />
    </svg>
  );
}
