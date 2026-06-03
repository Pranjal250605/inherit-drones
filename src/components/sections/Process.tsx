import { ArrowRight, SectionFrame, SectionLabel } from "../primitives";
import { useT } from "../../i18n";


export function Process() {
  const { t } = useT();

  return (
    <SectionFrame id="process" className="dot-grid-bg relative bg-bg py-24 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <header className="mb-24 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionLabel>{t.process.tag}</SectionLabel>
            <h2
              data-anim="title-up"
              className="mt-6 font-display text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-fg md:text-6xl"
            >
              {t.process.h2_line1} {t.process.h2_emph} {t.process.h2_line2}
            </h2>
            <div className="mt-5 font-jp text-[12px] tracking-[0.08em] text-fg/50">
              {t.process.subtitle_jp}
            </div>
          </div>
          <a
            href="#contact"
            className="group mt-6 inline-flex items-center gap-3 whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.18em] text-fg/80 transition-colors hover:text-orange-500 md:mt-0"
          >
            {t.process.cta}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-white transition group-hover:bg-orange-400">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </header>

        <div className="relative pb-32">
          {t.process.steps.map((s, i) => (
            <div
              key={s.n}
              className="sticky w-full overflow-hidden rounded-[2.5rem] border border-fg/10 bg-bg-alt p-8 shadow-2xl shadow-black/5 transition-transform duration-500 md:p-14"
              style={{ top: `calc(8rem + ${i * 2.5}rem)` }}
            >
              {/* Massive decorative number that acts as a watermark */}
              <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none">
                <span className="font-display text-[14rem] font-bold leading-none tracking-tighter text-fg/[0.03] md:text-[22rem]">
                  0{i + 1}
                </span>
              </div>

              {/* Decorative geometric blur for aesthetic lighting inside the card */}
              <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-500/10 blur-[100px]" />

              <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl flex-1">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white font-mono text-sm font-bold shadow-lg shadow-orange-500/30">
                      {i + 1}
                    </div>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                      Phase 0{i + 1}
                    </span>
                  </div>
                  
                  <h3 className="mt-10 font-display text-4xl font-bold tracking-tight text-fg md:text-5xl">
                    {s.title}
                  </h3>
                  
                  <p className="mt-6 text-lg leading-relaxed text-muted">
                    {s.body}
                  </p>
                  
                  <div className="mt-12 flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">
                      Sys.Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
