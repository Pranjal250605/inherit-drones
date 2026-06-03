import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, SectionLabel, ParallaxImage } from "../primitives";
import { useT, type Dict } from "../../i18n";
import droneSpraying from "../../assets/drone-spraying.jpg";
import hiroshimaAerial from "../../assets/hiroshima-aerial.jpg";
import teamNapa from "../../assets/team-napa.jpg";

gsap.registerPlugin(ScrollTrigger);

type CaseStudy = Dict["field"]["cases"][number];
const IMAGES = [droneSpraying, teamNapa, hiroshimaAerial];

export function UseCases() {
  const { t } = useT();
  const cases = t.field.cases;
  
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = scrollContainerRef.current;
    
    // Only apply horizontal scroll on desktop/tablet where it makes sense
    if (!section || !container || window.innerWidth < 768) return;

    const getScrollAmount = () => {
      let containerWidth = container.scrollWidth;
      return -(containerWidth - window.innerWidth);
    };

    const tween = gsap.to(container, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section id="field" ref={sectionRef} className="relative overflow-hidden bg-bg">
      <div className="flex flex-col md:h-screen md:justify-center">
        
        {/* Header - Sticky in horizontal scroll */}
        <div className="z-10 mx-auto w-full max-w-[1400px] px-6 pb-12 pt-24 lg:px-12 md:absolute md:left-0 md:right-0 md:top-12 md:pb-0 md:pt-0">
          <header className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <SectionLabel>{t.field.tag}</SectionLabel>
              <h2
                data-anim="title-up"
                className="mt-6 font-display text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-fg md:text-6xl"
              >
                {t.field.h2_pre}
                <span className="text-orange-500">{t.field.h2_emph}</span>
                {t.field.h2_post}
              </h2>
              <div className="mt-5 font-jp text-[12px] tracking-[0.08em] text-fg/50">
                {t.field.subtitle_jp}
              </div>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.18em] text-fg/80 transition-colors hover:text-orange-500"
            >
              {t.field.cta}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-white transition group-hover:bg-orange-400">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </header>
        </div>

        {/* Scroll Container */}
        <div 
          ref={scrollContainerRef} 
          className="flex flex-col gap-16 px-6 pb-24 md:flex-row md:items-center md:px-12 md:pb-0 md:pt-32 lg:w-max lg:gap-24"
        >
          {cases.map((c, i) => (
            <FieldCase
              key={c.code}
              c={c}
              index={i}
              imgSrc={IMAGES[i] ?? droneSpraying}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FieldCase({
  c,
  index,
  imgSrc,
}: {
  c: CaseStudy;
  index: number;
  imgSrc: string;
}) {
  return (
    <article className="group relative flex w-full max-w-3xl shrink-0 flex-col gap-y-10 md:w-[800px] md:flex-row md:items-center md:gap-x-14">
      {/* Index Number */}
      <div className="absolute -left-12 -top-24 hidden font-display text-[12rem] font-bold leading-none text-fg/5 transition-colors group-hover:text-orange-500/10 md:block">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* IMAGE */}
      <figure className="relative w-full md:w-3/5 shrink-0 overflow-hidden rounded-[2rem] shadow-xl">
        <ParallaxImage
          src={imgSrc}
          alt={c.title}
          speed={0.1}
          className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105"
        />
        {/* Floating stat overlay */}
        <div className="glass absolute bottom-5 left-5 rounded-xl px-5 py-4">
          <div className="font-display text-2xl font-bold leading-none tracking-[-0.02em] text-fg md:text-3xl">
            {c.stat_value}
          </div>
          <div className="mt-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-fg/70">
            {c.stat_label}
          </div>
        </div>
      </figure>

      {/* TEXT */}
      <div className="relative z-10 w-full md:w-2/5">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
          {c.tag}
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold leading-[1.08] tracking-tight text-fg md:text-4xl">
          {c.title}
        </h3>
        <p className="mt-5 text-[15px] leading-relaxed text-muted">
          {c.body}
        </p>
        <div className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">
          <span className="font-bold text-fg/80">{c.code}</span>
          <span className="h-px w-6 bg-fg/20" />
          {c.coords}
        </div>
      </div>
    </article>
  );
}
