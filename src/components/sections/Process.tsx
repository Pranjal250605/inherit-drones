import {
  ArrowRight,
  BracketTitle,
  JpAnno,
  Mono,
  SectionFrame,
  Tag,
} from "../primitives";
import { useT } from "../../i18n";

export function Process() {
  const { t } = useT();

  return (
    <SectionFrame id="process" className="overflow-hidden bg-bg py-24 md:py-32">
      <div className="absolute inset-0 micro-grid opacity-50" />

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <Tag>{t.process.tag}</Tag>
            <h2
              data-anim="title-up"
              className="mt-8 font-display text-3xl font-light leading-[1.15] tracking-[-0.015em] md:text-4xl"
            >
              {t.process.h2_line1}
              <br />
              <span className="italic text-orange-400">{t.process.h2_emph}</span>
              <br />
              {t.process.h2_line2}
            </h2>
            <div className="mt-5 font-jp text-[11px] tracking-[0.05em] text-fg/30">
              {t.process.subtitle_jp}
            </div>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg/60 hover:text-orange-400"
            >
              {t.process.cta} <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="relative">
              <div className="absolute left-0 top-0 hidden h-full w-px bg-fg/10 md:block" />
              <div
                data-anim="spine"
                className="absolute left-0 top-0 hidden h-full w-px origin-top bg-orange-500/60 md:block"
              />
              <div data-anim="stagger" className="space-y-12">
                {t.process.steps.map((s, i) => (
                  <div
                    key={s.n}
                    data-anim-item
                    className="group relative grid grid-cols-12 items-start gap-6 md:pl-12"
                    style={{ marginLeft: `${i * 14}px` }}
                  >
                    <div data-anim="node" className="absolute -left-[5px] top-2 hidden h-2.5 w-2.5 border border-fg/30 bg-bg transition group-hover:border-orange-500 group-hover:bg-orange-400 md:block" />

                    <div className="col-span-12 md:col-span-3">
                      <Mono className="text-orange-400/80">{s.n}</Mono>
                      <JpAnno className="ml-2">{s.jp}</JpAnno>
                      <h3 className="mt-3 font-display text-2xl font-light tracking-[-0.005em]">
                        <BracketTitle>{s.title}</BracketTitle>
                      </h3>
                    </div>
                    <div className="col-span-12 md:col-span-9">
                      <p className="max-w-2xl text-pretty text-sm leading-loose text-muted">
                        {s.body}
                      </p>
                    </div>
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
