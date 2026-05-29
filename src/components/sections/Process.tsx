import { ArrowRight, SectionFrame, SectionLabel } from "../primitives";
import { useT } from "../../i18n";

export function Process() {
  const { t } = useT();

  return (
    <SectionFrame id="process" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-32">
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
              <a
                href="#contact"
                className="group mt-10 inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.18em] text-fg/70 transition hover:text-orange-500"
              >
                {t.process.cta}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-white transition group-hover:bg-orange-400">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="relative pl-0 md:pl-12">
              <div className="absolute left-0 top-0 hidden h-full w-px bg-fg/10 md:block" />
              <div
                data-anim="spine"
                className="absolute left-0 top-0 hidden h-full w-px origin-top scale-y-0 bg-fg/30 md:block"
              />
              <div data-anim="stagger" className="flex flex-col">
                {t.process.steps.map((s) => (
                  <div
                    key={s.n}
                    data-anim-item
                    className="group relative border-t border-fg/12 py-10"
                  >
                    <div
                      data-anim="node"
                      className="absolute -left-[5px] top-10 hidden h-2.5 w-2.5 border border-fg/30 bg-bg transition group-hover:border-orange-500 group-hover:bg-orange-500 md:block md:-left-[calc(3rem+5px)]"
                    />
                    <div className="flex items-baseline justify-between gap-6">
                      <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-fg md:text-3xl">
                        {s.title}
                      </h3>
                      <span className="shrink-0 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-orange-500">
                        {s.n}
                      </span>
                    </div>
                    <p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-muted">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
