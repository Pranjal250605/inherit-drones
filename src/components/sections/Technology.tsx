import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionLabel } from "../primitives";
import { DroneGlyph } from "../tactical/primitives";
import { useT, type Dict } from "../../i18n";

gsap.registerPlugin(ScrollTrigger);

type Spec = Dict["tech"]["specs"][number];

// Strict 4-corner positions for the HUD stats to prevent overlapping
// Six specs → six slots, three down each flank of the drone (no overlap).
const HUD_POSITIONS = [
  "top-[2%] left-[-8%] lg:left-[-26%] xl:left-[-34%]",        // L top
  "top-[39%] left-[-12%] lg:left-[-32%] xl:left-[-40%]",      // L middle
  "bottom-[2%] left-[-8%] lg:left-[-26%] xl:left-[-34%]",     // L bottom
  "top-[2%] right-[-8%] lg:right-[-26%] xl:right-[-34%]",     // R top
  "top-[39%] right-[-12%] lg:right-[-32%] xl:right-[-40%]",   // R middle
  "bottom-[2%] right-[-8%] lg:right-[-26%] xl:right-[-34%]",  // R bottom
];

export function Technology() {
  const { t } = useT();
  const containerRef = useRef<HTMLElement>(null);
  const droneRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.innerWidth < 768) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=2000", // ~2 screens of scrolling (was 3.5 — too sticky)
          pin: true,
          scrub: 1,
        },
      });

      // Drone scales up, glows intensely
      tl.to(droneRef.current, {
        scale: 1.1,
        filter: "drop-shadow(0 0 80px rgba(249,115,22,0.4))",
        duration: 1,
      });

      // Stagger in the HUD spec cards
      specsRef.current.forEach((spec, i) => {
        if (!spec) return;
        tl.fromTo(
          spec,
          { autoAlpha: 0, scale: 0.8, x: i % 2 === 0 ? 50 : -50 },
          { autoAlpha: 1, scale: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );
      });

      // Hold at the end
      tl.to({}, { duration: 1.5 });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technology"
      ref={containerRef}
      className="topo-bg relative h-auto md:h-screen w-full overflow-hidden bg-bg-alt py-24 md:py-0"
    >
      <div className="mx-auto flex h-full max-w-[1400px] flex-col items-center justify-center px-6 lg:px-12 md:static relative">
        
        {/* Header - Fixed top left in desktop, static in mobile */}
        <div className="z-20 w-full md:absolute md:left-12 md:top-24 md:w-auto">
          <SectionLabel>{t.tech.tag}</SectionLabel>
          <h2 className="mt-6 max-w-xl font-display text-4xl font-bold leading-[1.04] tracking-tight text-fg md:text-5xl">
            {t.tech.h2_pre}
            <span className="text-orange-500">{t.tech.h2_emph}</span>
            {t.tech.h2_post}
          </h2>
          <div className="mt-5 font-jp text-[12px] tracking-[0.08em] text-fg/50">
            {t.tech.subtitle_jp}
          </div>
          <p className="mt-6 max-w-md text-pretty text-[15px] leading-relaxed text-muted">
            {t.tech.lead}
          </p>
        </div>

        {/* HUD Centerpiece */}
        <div className="relative mt-24 flex items-center justify-center md:mt-0">
          <div ref={droneRef} className="relative z-10 flex items-center justify-center transition-transform">
            <DroneGlyph className="h-[300px] w-[300px] text-fg drop-shadow-[0_0_20px_rgba(249,115,22,0.15)] md:h-[500px] md:w-[500px]" />
          </div>

          {/* Absolute HUD Cards — one per slot (six). Any extra specs are shown
              in the mobile grid below, so the HUD never doubles up / overlaps. */}
          <div className="absolute inset-0 z-20 hidden md:block">
            {t.tech.specs.slice(0, HUD_POSITIONS.length).map((s, i) => (
              <div
                key={s.k}
                ref={(el) => (specsRef.current[i] = el)}
                className={`absolute ${HUD_POSITIONS[i]} glass w-48 rounded-xl border border-orange-500/20 p-5`}
              >
                <SpecBar {...s} isHUD />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile-only specs grid (since HUD pinning is disabled on small screens) */}
        <div className="mt-16 grid w-full grid-cols-2 gap-x-8 gap-y-12 md:hidden">
          {t.tech.specs.map((s) => (
            <div key={s.k}>
              <SpecBar {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecBar({ k, v, unit, display, isHUD }: Spec & { isHUD?: boolean }) {
  // We use inline styles for the width because the GSAP global observer might not reliably hit pinned elements.
  return (
    <div className={`group ${!isHUD ? "border-t-2 border-fg/10 pt-4" : ""}`}>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-3xl font-bold leading-none tracking-[-0.02em] text-fg md:text-4xl">
          {display}
        </span>
        {unit && (
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-500">
            {unit}
          </span>
        )}
      </div>
      <div className="mt-3 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-fg/55">
        {k}
      </div>
      <div className="relative mt-4 h-[2px] w-full rounded-full bg-fg/10">
        <div
          className="absolute bottom-0 left-0 h-[2px] rounded-full bg-orange-500 transition-all duration-1000 ease-out"
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}
