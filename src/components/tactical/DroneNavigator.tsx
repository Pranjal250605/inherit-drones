import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DroneGlyph } from "./primitives";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   DRONE NAVIGATOR  (the signature scroll interaction)
   ------------------------------------------------------------
   A fixed vertical "flight rail" pinned to the right edge. Each
   waypoint maps to a section anchor and is positioned on the rail
   at that section's real scroll fraction, so the drone — whose
   travel down the rail is driven by overall page-scroll progress —
   physically passes THROUGH each waypoint as you reach its section.

   • scroll down  → drone descends the rail
   • scroll velocity → drone banks/tilts (physics feel)
   • nearest waypoint lights orange + a live readout names the section
   • click any waypoint → smooth-fly (scroll) to that section

   Hidden on < lg screens (the rail would crowd small viewports);
   a reduced-motion guard parks the drone statically.
============================================================ */

type Waypoint = { id: string; code: string; label: string };

// English instrumentation labels by design (this is a HUD), independent of lang.
const WAYPOINTS: Waypoint[] = [
  { id: "top", code: "00", label: "Home" },
  { id: "mission", code: "01", label: "Mission" },
  { id: "solutions", code: "02", label: "Solutions" },
  { id: "process", code: "03", label: "Operations" },
  { id: "technology", code: "04", label: "Technology" },
  { id: "field", code: "05", label: "Field" },
  { id: "contact", code: "06", label: "Contact" },
];

export function DroneNavigator() {
  const railWrapRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLDivElement>(null);
  const [pcts, setPcts] = useState<number[]>(() => WAYPOINTS.map(() => 0));
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const railWrap = railWrapRef.current;
    const drone = droneRef.current;
    if (!railWrap || !drone) return;

    // Measure each section's scroll fraction → its position (%) on the rail.
    const measure = () => {
      const scrollRange = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const next = WAYPOINTS.map((w) => {
        const el = document.getElementById(w.id);
        if (!el) return 0;
        return Math.min(100, Math.max(0, (el.offsetTop / scrollRange) * 100));
      });
      setPcts(next);
    };
    measure();

    // Smooth setters for the drone's vertical travel + banking tilt.
    const yTo = gsap.quickTo(drone, "y", { duration: 0.35, ease: "power3.out" });
    const rotTo = gsap.quickTo(drone, "rotation", {
      duration: 0.5,
      ease: "power2.out",
    });

    const applyActive = (p: number) => {
      // active = last waypoint whose section start is at/above current progress
      let idx = 0;
      const pPct = p * 100;
      for (let i = 0; i < WAYPOINTS.length; i++) {
        const el = document.getElementById(WAYPOINTS[i].id);
        if (!el) continue;
        const scrollRange = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const wp = (el.offsetTop / scrollRange) * 100;
        if (pPct + 4 >= wp) idx = i;
      }
      setActiveIdx((prev) => (prev === idx ? prev : idx));
    };

    if (prefersReducedMotion) {
      // Park the drone at the top, no scroll coupling.
      gsap.set(drone, { y: 0, rotation: 0 });
      const onScroll = () => {
        const scrollRange = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const p = window.scrollY / scrollRange;
        setProgress(p);
        applyActive(p);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", measure);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", measure);
      };
    }

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onRefresh: measure,
      onUpdate: (self) => {
        const p = self.progress;
        const h = railWrap.clientHeight;
        yTo(p * h);
        // Bank the drone proportional to scroll velocity (clamped).
        const v = self.getVelocity();
        const tilt = gsap.utils.clamp(-16, 16, v * -0.012);
        rotTo(tilt);
        setProgress(p);
        applyActive(p);
      },
    });

    // Settle tilt back to level shortly after scrolling stops.
    let settle = 0;
    const onScrollSettle = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(() => rotTo(0), 140);
    };
    window.addEventListener("scroll", onScrollSettle, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      st.kill();
      window.removeEventListener("scroll", onScrollSettle);
      window.removeEventListener("resize", measure);
      window.clearTimeout(settle);
    };
  }, []);

  const flyTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 right-3 z-40 hidden w-16 lg:block xl:right-6"
    >
      {/* Rail wrapper spans the viewport with vertical insets; waypoints and the
          drone are positioned within it. */}
      <div
        ref={railWrapRef}
        className="absolute inset-x-0 top-[16vh] bottom-[14vh]"
      >
        {/* the rail line */}
        <svg
          className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 2 100"
        >
          <line x1="1" y1="0" x2="1" y2="100" stroke="rgb(255 255 255 / 0.12)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          {/* orange "flown" portion up to current progress */}
          <line
            x1="1"
            y1="0"
            x2="1"
            y2={Math.max(0.001, progress * 100)}
            stroke="rgb(249 115 22)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* waypoints */}
        {WAYPOINTS.map((w, i) => {
          const isActive = i === activeIdx;
          const isFlown = pcts[i] <= progress * 100 + 0.5;
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => flyTo(w.id)}
              aria-label={`Fly to ${w.label}`}
              style={{ top: `${pcts[i]}%` }}
              className="group pointer-events-auto absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
            >
              {/* label, appears on hover / when active, to the LEFT of the rail */}
              <span
                className={
                  "absolute right-full mr-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.28em] transition-all duration-200 " +
                  (isActive
                    ? "text-orange-400 opacity-100"
                    : "text-white/55 opacity-0 group-hover:opacity-100")
                }
              >
                <span className="mr-1.5 text-white/30">{w.code}</span>
                {w.label}
              </span>
              {/* node marker (diamond) */}
              <span
                className={
                  "h-2.5 w-2.5 rotate-45 border transition-all duration-200 " +
                  (isActive
                    ? "scale-125 border-orange-500 bg-orange-500"
                    : isFlown
                    ? "border-orange-500/70 bg-orange-500/30"
                    : "border-white/30 bg-[#04060a] group-hover:border-orange-400")
                }
              />
            </button>
          );
        })}

        {/* the drone — translateY driven by scroll progress in the effect */}
        <div
          ref={droneRef}
          className="absolute left-1/2 top-0 -ml-7 w-14"
          style={{ transformOrigin: "center" }}
        >
          {/* contrail trailing above the drone */}
          <div className="absolute bottom-full left-1/2 h-16 w-px -translate-x-1/2 bg-gradient-to-t from-orange-500/70 to-transparent" />
          {/* idle hover so vertical scroll-travel and the gentle bob compose */}
          <div className="drone-bob relative grid place-items-center">
            <DroneGlyph className="h-12 w-12 text-white drop-shadow-[0_0_10px_rgba(249,115,22,0.35)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
