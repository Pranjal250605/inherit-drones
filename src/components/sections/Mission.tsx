import { Mono, SectionFrame, SectionLabel } from "../primitives";
import { useT } from "../../i18n";
import teamNapa from "../../assets/team-napa.jpg";

export function Mission() {
  const { t } = useT();

  return (
    <SectionFrame id="mission" className="overflow-hidden bg-bg py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,.07),_transparent_55%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="max-w-4xl">
          <SectionLabel>{t.mission.tag}</SectionLabel>
          <h2
            data-anim="title-up"
            className="mt-6 font-display text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-fg md:text-6xl"
          >
            {t.mission.h2_pre}
            {t.mission.h2_emph}
            {t.mission.h2_post}
          </h2>
          <div className="mt-5 font-jp text-[12px] tracking-[0.08em] text-fg/50">
            {t.mission.subtitle_jp}
          </div>
        </div>

        <figure className="mt-16 overflow-hidden md:mt-20">
          <div data-anim="reveal" className="relative aspect-[21/9] overflow-hidden">
            <img
              data-anim="parallax"
              data-speed="0.14"
              src={teamNapa}
              alt="INHERIT pilot team — NAPA Drone Academy, Hiroshima"
              className="absolute inset-0 h-[120%] w-full -translate-y-[10%] scale-105 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-5 bottom-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-fg/80">
              <span>NAPA Drone Academy</span>
              <span className="text-orange-400">Hiroshima</span>
            </figcaption>
          </div>
        </figure>

        <div
          data-anim="stagger"
          className="mt-20 grid grid-cols-1 gap-x-12 gap-y-14 md:mt-28 md:grid-cols-3"
        >
          {t.mission.pillars.map((p) => (
            <div
              key={p.code}
              data-anim-item
              className="border-t-2 border-orange-500/80 pt-6"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl font-bold tracking-[-0.01em]">
                  {p.title}
                </h3>
                <Mono className="text-fg/40">{p.jp}</Mono>
              </div>
              <p className="mt-5 max-w-sm text-pretty text-[15px] leading-relaxed text-muted">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
