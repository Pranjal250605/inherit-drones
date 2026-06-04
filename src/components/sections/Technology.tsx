import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionLabel } from "../primitives";
import { DroneGlyph } from "../tactical/primitives";
import { useT, type Dict } from "../../i18n";

gsap.registerPlugin(ScrollTrigger);

type Spec = Dict["tech"]["specs"][number];

export function Technology() {
  const { t } = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const droneRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<(HTMLDivElement | null)[]>([]);
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Left column: fade up on scroll
      gsap.fromTo(
        leftRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Drone entrance
      gsap.fromTo(
        droneRef.current,
        { autoAlpha: 0, scale: 0.85 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );

      // Spec cards stagger in
      const cards = specsRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="topo-bg relative w-full overflow-hidden bg-bg-alt py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">

        {/* ─── Two-column layout ─── */}
        <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2 md:gap-12 lg:gap-20">

          {/* LEFT — heading block */}
          <div ref={leftRef} className="flex flex-col justify-center">
            <SectionLabel>{t.tech.tag}</SectionLabel>

            <h2 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-[-0.02em] text-fg md:text-6xl lg:text-7xl">
              {t.tech.h2_pre}
              <span className="text-orange-500">{t.tech.h2_emph}</span>
              {t.tech.h2_post}
              <br />
              {t.tech.h2_line2}
            </h2>

            <div className="mt-5 font-mono text-[11px] tracking-[0.12em] text-fg/45 uppercase">
              {t.tech.subtitle_jp}
            </div>

            <p className="mt-6 max-w-md text-pretty text-[15px] leading-relaxed text-muted">
              {t.tech.lead}
            </p>

            {/* Chips */}
            {t.tech.chips && t.tech.chips.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {t.tech.chips.map((chip) => (
                  <span
                    key={chip}
                    className="glass rounded-full border border-fg/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fg/60"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — drone + spec grid */}
          <div className="flex flex-col items-center gap-10">

            {/* Drone illustration */}
            <div
              ref={droneRef}
              className="flex items-center justify-center"
            >
              <DroneGlyph className="h-[260px] w-[260px] text-fg drop-shadow-[0_0_24px_rgba(249,115,22,0.18)] md:h-[340px] md:w-[340px] lg:h-[400px] lg:w-[400px]" />
            </div>

            {/* Spec cards — aligned 3-column grid (2 on mobile) */}
            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
              {t.tech.specs.map((s, i) => (
                <div
                  key={s.k}
                  ref={(el) => (specsRef.current[i] = el)}
                  className="glass rounded-xl border border-orange-500/15 p-4"
                >
                  <SpecBar {...s} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function SpecBar({ k, v, unit, display }: Spec) {
  return (
    <div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-2xl font-bold leading-none tracking-[-0.02em] text-fg">
          {display}
        </span>
        {unit && (
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-orange-500">
            {unit}
          </span>
        )}
      </div>
      <div className="mt-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-fg/50">
        {k}
      </div>
      <div className="relative mt-3 h-[2px] w-full rounded-full bg-fg/10">
        <div
          className="absolute bottom-0 left-0 h-[2px] rounded-full bg-orange-500"
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}
