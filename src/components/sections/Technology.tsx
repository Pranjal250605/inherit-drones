import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionLabel } from "../primitives";
import { useT, type Dict } from "../../i18n";
import hayabusaKanji from "../../assets/hayabusa_calligraphy_v2.png";
import droneImg from "../../assets/hayabusa_drone.png";

gsap.registerPlugin(ScrollTrigger);

type Spec = Dict["tech"]["specs"][number];

export function Technology() {
  const { t } = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const droneRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Six key specs, three down each flank of the drone.
  const specs = t.tech.specs.slice(0, 6);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%" },
        }
      );
      gsap.fromTo(
        droneRef.current,
        { autoAlpha: 0, scale: 0.85 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 68%" },
        }
      );
      gsap.fromTo(
        specsRef.current.filter(Boolean),
        { autoAlpha: 0, x: (i) => (i < 3 ? -40 : 40) },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: "top 60%" },
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
      <div className="mx-auto max-w-[87.5rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* HEADING */}
          <div ref={leftRef} className="lg:col-span-3">
            <SectionLabel>{t.tech.tag}</SectionLabel>
            <h2 className="mt-6 font-display text-[3.25rem] font-bold leading-[1.03] tracking-[-0.02em] text-fg md:text-6xl lg:text-6xl">
              {t.tech.h2_pre}
              <span className="whitespace-nowrap text-orange-500">{t.tech.h2_emph}</span>
              {t.tech.h2_post}
              <br />
              {t.tech.h2_line2}
            </h2>
            <p className="mt-7 max-w-md text-pretty text-lg leading-relaxed text-muted md:text-xl">
              {t.tech.lead}
            </p>
          </div>

          {/* 隼 = "Hayabusa" — gold brush calligraphy, its own column so it can
              be large without ever overlapping the heading or the specs. */}
          <div className="flex justify-center lg:col-span-3">
            <img
              src={hayabusaKanji}
              alt=""
              aria-hidden="true"
              className="pointer-events-none w-[11rem] -translate-x-4 -translate-y-5 select-none object-contain sm:w-[13.5rem] lg:w-[17rem]"
              style={{
                filter:
                  "drop-shadow(1.25px 0 0 #000) drop-shadow(-1.25px 0 0 #000) drop-shadow(0 1.25px 0 #000) drop-shadow(0 -1.25px 0 #000) drop-shadow(0.9px 0.9px 0 #000) drop-shadow(-0.9px 0.9px 0 #000) drop-shadow(0.9px -0.9px 0 #000) drop-shadow(-0.9px -0.9px 0 #000)",
              }}
            />
          </div>

          {/* RIGHT — drone with specs (unchanged). */}
          <div className="lg:col-span-6">
            {/* MOBILE layout */}
            <div className="sm:hidden">
              <div className="mb-12 flex justify-center">
                <DroneImage className="w-[230px]" />
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-9 border-t border-fg/10 pt-9">
                {specs.map((s) => (
                  <SpecStat key={s.k} spec={s} align="left" refCb={() => {}} />
                ))}
              </div>
            </div>

            {/* SM+ flank layout */}
            <div className="hidden items-center gap-x-6 sm:grid sm:grid-cols-[1fr_auto_1fr] lg:gap-x-10">
              <div className="flex flex-col gap-10">
                {specs.slice(0, 3).map((s, i) => (
                  <SpecStat
                    key={s.k}
                    spec={s}
                    align="right"
                    refCb={(el) => (specsRef.current[i] = el)}
                  />
                ))}
              </div>

              <div ref={droneRef} className="flex justify-center">
                <DroneImage className="w-[300px] md:w-[360px] lg:w-[400px]" />
              </div>

              <div className="flex flex-col gap-10">
                {specs.slice(3, 6).map((s, i) => (
                  <SpecStat
                    key={s.k}
                    spec={s}
                    align="left"
                    refCb={(el) => (specsRef.current[i + 3] = el)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Rendered drone image with four spinning propeller overlays sitting on top of
   the (static) props in the photo — so the fins appear to rotate. The image
   background is blended into the section via mix-blend-multiply. */
const ROTOR_POS = [
  "left-[24.5%] top-[23%]",
  "left-[75.5%] top-[23%]",
  "left-[24.5%] top-[77%]",
  "left-[75.5%] top-[77%]",
];

function DroneImage({ className = "" }: { className?: string }) {
  return (
    <div className={"relative aspect-[574/502] mix-blend-multiply " + className}>
      <img
        src={droneImg}
        alt="IH-04 Hayabusa drone"
        className="absolute inset-0 h-full w-full object-contain"
      />
      {ROTOR_POS.map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={"absolute h-[33%] w-[33%] -translate-x-1/2 -translate-y-1/2 " + pos}
        >
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full motion-safe:animate-[spin_0.4s_linear_infinite]"
          >
            <ellipse cx="50" cy="50" rx="48" ry="9.5" fill="#0b0b0d" />
            <ellipse cx="50" cy="50" rx="9.5" ry="48" fill="#0b0b0d" />
            <circle cx="50" cy="50" r="9" fill="#19191c" />
            <circle cx="50" cy="50" r="3.6" fill="#f97316" />
          </svg>
        </span>
      ))}
    </div>
  );
}

function SpecStat({
  spec,
  align,
  refCb,
}: {
  spec: Spec;
  align: "left" | "right";
  refCb: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={refCb} className={align === "right" ? "sm:text-right" : "sm:text-left"}>
      <div className="font-display text-4xl font-bold leading-none tracking-[-0.02em] text-fg lg:text-5xl">
        {spec.display}
        {spec.unit && (
          <span className="ml-1.5 font-mono text-sm font-bold uppercase tracking-[0.12em] text-orange-500">
            {spec.unit}
          </span>
        )}
      </div>
      <div className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-fg/50">
        {spec.k}
      </div>
    </div>
  );
}
