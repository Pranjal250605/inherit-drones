import { Mono, SectionFrame, SectionLabel, ParallaxImage } from "../primitives";
import { useT } from "../../i18n";
import teamNapa from "../../assets/team-napa.jpg";

const PILLAR_OFFSET = ["", "md:mt-12", "md:mt-5"];

export function Mission() {
  const { t } = useT();

  return (
    <SectionFrame id="mission" className="topo-bg relative overflow-hidden bg-bg py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,.07),_transparent_55%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="relative max-w-4xl">
          {/* oversized drifting index — depth + editorial asymmetry */}
          <span
            aria-hidden="true"
            data-anim="parallax"
            data-speed="0.32"
            className="pointer-events-none absolute -right-2 -top-24 select-none font-display text-[9rem] font-bold leading-none text-fg/[0.05] md:-top-28 md:text-[14rem]"
          >
            01
          </span>

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

        <figure
          data-anim="reveal"
          className="relative mt-16 aspect-[21/9] overflow-hidden rounded-2xl md:mt-20"
        >
          <ParallaxImage
            src={teamNapa}
            alt="INHERIT pilot team — NAPA Drone Academy, Hiroshima"
            speed={0.2}
            className="absolute inset-0 h-full w-full"
          />
          <figcaption className="absolute inset-x-5 bottom-5 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/80">
            <span>NAPA Drone Academy</span>
            <span className="text-orange-400">Hiroshima</span>
          </figcaption>
        </figure>

        <div
          data-anim="stagger"
          className="mt-20 grid grid-cols-1 gap-x-12 gap-y-14 md:mt-28 md:grid-cols-3 md:items-start"
        >
          {t.mission.pillars.map((p, i) => (
            <div
              key={p.code}
              data-anim-item
              className={"border-t-2 border-orange-500/80 pt-6 " + (PILLAR_OFFSET[i] ?? "")}
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
