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
      <div className="flex flex-col md:h-screen">
        {/* Header — sits below the fixed navbar */}
        <div className="mx-auto w-full max-w-[87.5rem] shrink-0 px-6 pb-6 pt-28 lg:px-12">
          <header className="flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <SectionLabel>{t.field.tag}</SectionLabel>
              <h2
                data-anim="title-up"
                className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-fg md:text-6xl"
              >
                {t.field.h2_pre}
                <span className="text-orange-500">{t.field.h2_emph}</span>
                {t.field.h2_post}
              </h2>
              <div className="mt-4 font-jp text-[13.5px] tracking-[0.08em] text-fg/50">
                {t.field.subtitle_jp}
              </div>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.18em] text-fg/80 transition-colors hover:text-orange-500"
            >
              {t.field.cta}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-white transition-all duration-300 group-hover:scale-[1.3] group-hover:bg-orange-400 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </header>
        </div>

        {/* Card row — fills the remaining height; cards centered in it */}
        <div className="flex flex-1 items-center overflow-hidden pb-20 md:pb-0">
          <div
            ref={scrollContainerRef}
            className="flex flex-col gap-14 px-6 md:flex-row md:items-center md:px-12 lg:w-max lg:gap-24"
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
  const { t } = useT();
  return (
    <article className="group relative flex w-full max-w-3xl shrink-0 flex-col gap-y-8 md:w-[860px] md:flex-row md:items-center md:gap-x-14">
      {/* faint index numeral */}
      <div className="pointer-events-none absolute -left-10 -top-20 hidden select-none font-display text-[11rem] font-bold leading-none text-fg/[0.05] md:block">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* IMAGE */}
      <figure className="relative w-full shrink-0 overflow-hidden rounded-[2rem] shadow-xl md:w-[52%]">
        <ParallaxImage
          src={imgSrc}
          alt={c.title}
          speed={0.1}
          className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {/* floating stat */}
        <div className="glass absolute bottom-5 left-5 rounded-2xl px-6 py-5">
          <div className="font-display text-4xl font-bold leading-none tracking-[-0.03em] text-fg md:text-5xl">
            {c.stat_value}
          </div>
          <div className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/70">
            {c.stat_label}
          </div>
        </div>
      </figure>

      {/* TEXT */}
      <div className="relative z-10 w-full md:w-[48%]">
        <div className="text-[13px] font-bold uppercase tracking-[0.22em] text-orange-500">
          {c.tag}
        </div>
        <h3 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-fg md:text-5xl">
          {c.title}
        </h3>
        <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">
          {c.body}
        </p>
        <a
          href="#contact"
          className="mt-9 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.18em] text-orange-500 transition-all group-hover:gap-3.5"
        >
          {t.field.open}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
