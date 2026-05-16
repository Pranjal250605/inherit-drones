import { Dot, JpAnno, Mono, SectionFrame, Tag } from "../primitives";
import { useT } from "../../i18n";
import teamNapa from "../../assets/team-napa.jpg";

export function Mission() {
  const { t } = useT();

  return (
    <SectionFrame id="mission" className="overflow-hidden bg-bg py-24 md:py-32">
      <div className="absolute inset-0 micro-grid opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,.04),_transparent_60%)]" />

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <Tag>{t.mission.tag}</Tag>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2
              data-anim="title-up"
              className="max-w-3xl font-display text-2xl font-light leading-[1.3] tracking-[-0.01em] text-fg/90 md:text-3xl"
            >
              {t.mission.h2_pre}
              <span className="italic text-orange-400">{t.mission.h2_emph}</span>
              {t.mission.h2_post}
            </h2>
            <div className="mt-5 font-jp text-[11px] tracking-[0.05em] text-fg/30">
              {t.mission.subtitle_jp}
            </div>

            <figure
              data-anim="img-reveal"
              className="mt-12 relative overflow-hidden border border-fg/10 aspect-[16/9]"
            >
              <img
                src={teamNapa}
                alt="INHERIT pilot team — NAPA Drone Academy, Hiroshima"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/15" />
              <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-fg">
                <span className="flex items-center gap-2">
                  <Mono className="text-orange-400">IMG / 0.01</Mono>
                  <span className="text-fg/70">NAPA Drone Academy · Cohort</span>
                </span>
                <span className="flex items-center gap-2 text-orange-400">
                  <Dot /> Hiroshima
                </span>
              </figcaption>
            </figure>

            <div
              data-anim="stagger"
              className="mt-20 grid grid-cols-1 gap-x-10 gap-y-12 border-t border-fg/10 pt-12 md:grid-cols-3"
            >
              {t.mission.pillars.map((p) => (
                <div key={p.code} data-anim-item className="relative">
                  <div className="absolute -left-3 top-0 h-full w-px bg-fg/10" />
                  <div className="flex items-baseline gap-3">
                    <Mono className="text-orange-400/80">{p.code}</Mono>
                    <JpAnno>{p.jp}</JpAnno>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-light tracking-[-0.005em]">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-pretty text-sm leading-loose text-muted">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
