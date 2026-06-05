import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionFrame, SectionLabel, ParallaxImage, Kanji } from "../primitives";
import { useT } from "../../i18n";
import teamNapa from "../../assets/team-napa.jpg";

gsap.registerPlugin(ScrollTrigger);

/* Punchy warm hues per pillar — orange → amber → yellow. */
const PILLAR_COLORS = ["#F97316", "#F59E0B", "#EAB308"];

export function Mission() {
  const { t } = useT();
  const gridRef = useRef<HTMLDivElement>(null);

  /* Glitch-in reveal: each pillar stutters in with a chromatic (RGB-split)
     flicker, one after another on a short delay, when the row scrolls into
     view. Disabled (pillars simply visible) under reduced motion. */
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-glitch]", grid);
      gsap.set(items, { opacity: 0 });

      ScrollTrigger.create({
        trigger: grid,
        start: "top 82%",
        once: true,
        onEnter: () => {
          items.forEach((el, i) => {
            const tl = gsap.timeline({ delay: i * 0.16 });
            tl.fromTo(
              el,
              { opacity: 0.12, x: -12, skewX: 14 },
              { opacity: 1, x: 0, skewX: 0, duration: 0.5, ease: "steps(10)" },
              0
            );
            const title = el.querySelector<HTMLElement>("[data-glitch-title]");
            if (title) {
              tl.fromTo(
                title,
                {
                  textShadow:
                    "3px 0 rgba(34,211,238,0.9), -3px 0 rgba(244,63,94,0.9)",
                },
                {
                  textShadow:
                    "0px 0 rgba(34,211,238,0), 0px 0 rgba(244,63,94,0)",
                  duration: 0.55,
                  ease: "steps(8)",
                },
                0
              );
            }
          });
        },
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame id="mission" className="topo-bg relative overflow-hidden bg-bg py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,.07),_transparent_55%)]" />

      <div className="relative mx-auto max-w-[87.5rem] px-6 lg:px-12">
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
            className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-fg md:text-7xl"
          >
            {t.mission.h2_pre}
            <Kanji className="text-orange-500">{t.mission.h2_emph}</Kanji>
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
          ref={gridRef}
          className="mt-20 grid grid-cols-1 gap-x-12 gap-y-12 md:mt-28 md:grid-cols-3 md:items-start"
        >
          {t.mission.pillars.map((p, i) => {
            const color = PILLAR_COLORS[i % PILLAR_COLORS.length];
            return (
              <div
                key={p.code}
                data-glitch
                className="border-t-2 pt-6"
                style={{ borderColor: color }}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className="font-mono text-[13px] font-bold tracking-[0.18em]"
                    style={{ color }}
                  >
                    0{i + 1}
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-fg/40">
                    {p.jp}
                  </span>
                </div>
                <h3
                  data-glitch-title
                  className="mt-6 font-display text-4xl font-bold leading-[1.02] tracking-[-0.02em] md:text-5xl"
                  style={{ color }}
                >
                  {p.title}
                </h3>
                <p className="mt-4 text-pretty text-[16px] leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </SectionFrame>
  );
}
