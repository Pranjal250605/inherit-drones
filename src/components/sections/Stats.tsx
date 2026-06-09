import { TickMark } from "../primitives";
import { useT, type Dict } from "../../i18n";
import { useTheme } from "../../theme";

/* Banner colour ramps — orange by default, navy in the blueprint theme. */
const RAMP = {
  orange: {
    panel:
      "radial-gradient(135% 120% at 82% 20%, rgba(255,170,82,0.62), rgba(255,140,40,0) 52%)," +
      "radial-gradient(95% 130% at 6% 56%, rgba(7,5,3,0.94), rgba(7,5,3,0) 58%)," +
      "linear-gradient(102deg, #1b0d06 0%, #4d1a06 19%, #9c3309 37%, #d9500c 57%, #f1681a 78%, #fb8a2e 100%)",
    dots: "rgba(255,210,170,0.55)",
  },
  navy: {
    panel:
      "radial-gradient(135% 120% at 82% 20%, rgba(120,160,255,0.55), rgba(90,130,240,0) 52%)," +
      "radial-gradient(95% 130% at 6% 56%, rgba(3,7,18,0.95), rgba(3,7,18,0) 58%)," +
      "linear-gradient(102deg, #060f20 0%, #0c1f44 19%, #11306e 37%, #1a47a0 57%, #2257c4 78%, #3f78e6 100%)",
    dots: "rgba(190,210,255,0.55)",
  },
};

/* ============================================================
   Stats — "Command Deck" banner
   An angled, full-bleed dark→orange panel carrying the four
   headline metrics as glass cards, framed by wireframe drones
   and instrumentation HUD chrome. Count-up + progress bars are
   wired via the global GSAP attribute vocabulary.
============================================================ */

/* Final formatted value — rendered as the default text so the real number is
   always present (no-JS / reduced-motion). GSAP count-up enhances it. */
function formatStat(it: Dict["stats"][number]): string {
  const v = parseFloat(it.n);
  const decimals = it.decimal ? 1 : 0;
  const num = it.thousands
    ? v.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : v.toFixed(decimals);
  return num + it.suf;
}

/* Per-card progress-bar fill (decorative, evokes a live gauge). */
const BAR = [78, 96, 34, 62];

/* Per-card instrumentation icon. */
const ICONS = [
  // trend / chart-up
  <svg key="i0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 17l5-5 3 3 7-8" />
    <path d="M15 7h5v5" />
  </svg>,
  // shield-check
  <svg key="i1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l7 3v5c0 4.6-3.1 7.7-7 9-3.9-1.3-7-4.4-7-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  // target
  <svg key="i2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
  </svg>,
  // group / people
  <svg key="i3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <path d="M16 6.5a2.7 2.7 0 0 1 0 5.4M17.5 20c0-2.3-1-4-2.6-5" />
  </svg>,
];

/* Wireframe quadcopter — blueprint motif in the banner corners. */
function WireDrone({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 170"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* central body */}
      <path d="M112 70 L130 60 L150 70 L150 92 L130 102 L112 92 Z" />
      <path d="M120 76 L130 71.5 L142 76 L142 86 L130 90.5 L120 86 Z" opacity="0.65" />
      <ellipse cx="131" cy="81" rx="6" ry="3.4" />
      {/* arms */}
      <line x1="116" y1="72" x2="60" y2="44" />
      <line x1="148" y1="72" x2="206" y2="50" />
      <line x1="114" y1="90" x2="52" y2="112" />
      <line x1="150" y1="90" x2="212" y2="120" />
      {/* rotor discs (perspective ellipses) */}
      <ellipse cx="56" cy="42" rx="34" ry="11" />
      <ellipse cx="210" cy="48" rx="36" ry="12" />
      <ellipse cx="48" cy="112" rx="40" ry="13" />
      <ellipse cx="216" cy="120" rx="42" ry="14" />
      {/* motor hubs */}
      <circle cx="56" cy="42" r="3.2" />
      <circle cx="210" cy="48" r="3.2" />
      <circle cx="48" cy="112" r="3.2" />
      <circle cx="216" cy="120" r="3.2" />
      {/* prop-blade hints */}
      <line x1="22" y1="42" x2="90" y2="42" opacity="0.5" />
      <line x1="174" y1="48" x2="246" y2="48" opacity="0.5" />
      <line x1="8" y1="112" x2="88" y2="112" opacity="0.5" />
      <line x1="174" y1="120" x2="258" y2="120" opacity="0.5" />
      {/* landing skids */}
      <line x1="120" y1="98" x2="110" y2="120" />
      <line x1="144" y1="98" x2="154" y2="120" />
      <line x1="104" y1="120" x2="160" y2="120" opacity="0.6" />
    </svg>
  );
}

export function Stats() {
  const { t, lang } = useT();
  const { theme } = useTheme();
  const ramp = theme === "blueprint" ? RAMP.navy : RAMP.orange;
  const stats = t.stats.slice(0, 4);

  return (
    <section id="metrics" className="relative overflow-hidden bg-bg">
      <div className="relative">
        {/* ===== Angled orange panel (full-bleed, dark → bright) ===== */}
        <div
          aria-hidden="true"
          className="diag-band absolute inset-0 [--diag:1.25rem] md:[--diag:4.5rem]"
          style={{ background: ramp.panel }}
        />

        {/* ===== HUD / instrumentation chrome ===== */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* wireframe drones */}
          <WireDrone className="absolute -right-6 top-4 h-44 w-64 text-orange-100/60 md:right-8 md:top-8 md:h-60 md:w-[26rem]" />
          <WireDrone className="absolute -left-14 bottom-2 hidden h-36 w-56 -scale-x-100 text-orange-200/35 sm:block md:-left-10 md:bottom-4 md:h-48 md:w-80" />

          {/* radar sweep arcs, left */}
          <svg className="absolute -left-24 top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 text-orange-200/20 md:block" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="200" cy="200" r="190" strokeDasharray="2 10" />
            <circle cx="200" cy="200" r="150" />
            <circle cx="200" cy="200" r="108" strokeDasharray="20 14" />
          </svg>

          {/* top eyebrow HUD text */}
          <div className="absolute left-[28%] top-[20%] hidden font-mono text-[10px] font-semibold uppercase tracking-[0.34em] text-orange-100/55 lg:block">
            <div>/// ADVANCED</div>
            <div className="mt-1 pl-4">» AERIAL SYSTEM</div>
          </div>

          {/* bottom-right caption */}
          <div className="absolute bottom-[14%] right-[4%] hidden text-right font-mono text-[10px] font-semibold uppercase tracking-[0.34em] text-white/35 lg:block">
            <div>PRECISION</div>
            <div>PERFORMANCE ///</div>
          </div>

          {/* crosshair marks */}
          {["left-[6%] top-[30%]", "left-[40%] top-[16%]", "right-[24%] top-[24%]", "left-[30%] bottom-[14%]", "right-[14%] bottom-[30%]"].map((pos) => (
            <span key={pos} className={"absolute text-orange-100/40 " + pos}>
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M8 1v14M1 8h14" />
              </svg>
            </span>
          ))}

          {/* flowing contour waves, bottom */}
          <svg className="absolute -bottom-6 left-0 h-44 w-full text-orange-200/25" viewBox="0 0 1440 200" fill="none" stroke="currentColor" strokeWidth="1" preserveAspectRatio="none">
            <path d="M0 150 C 240 90 480 90 720 140 S 1200 200 1440 120" />
            <path d="M0 175 C 260 120 520 120 760 165 S 1220 215 1440 150" opacity="0.7" />
            <path d="M0 120 C 220 70 470 70 700 110 S 1180 165 1440 95" opacity="0.5" />
          </svg>

          {/* halftone dot field, bottom-right */}
          <div
            className="absolute bottom-0 right-0 h-56 w-72 opacity-50"
            style={{
              backgroundImage: `radial-gradient(${ramp.dots} 1px, transparent 1.4px)`,
              backgroundSize: "12px 12px",
              maskImage: "radial-gradient(120% 120% at 100% 100%, #000 20%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(120% 120% at 100% 100%, #000 20%, transparent 70%)",
            }}
          />
        </div>

        {/* ===== Content ===== */}
        <div className="relative mx-auto max-w-[87.5rem] px-6 py-20 sm:py-24 lg:px-12 lg:py-32">
          <div
            data-anim="card-stagger"
            className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-4 lg:gap-6"
          >
            {stats.map((it, i) => (
              <div
                key={it.code}
                data-anim-item
                className="group relative overflow-hidden rounded-2xl bg-[rgb(10_8_8/0.42)] p-5 ring-1 ring-white/12 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:ring-orange-400/50 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6),0_0_40px_-12px_rgb(var(--brand-500)/0.5)] lg:p-6"
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.14), 0 24px 60px -30px rgba(0,0,0,0.7)",
                }}
              >
                {/* top highlight sheen */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/60 to-transparent" />

                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-orange-300">
                      {it.code}
                    </div>
                    <div className="mt-1.5 h-px w-7 bg-orange-400/70" />
                  </div>
                  <span className="h-5 w-5 text-white/55 transition-colors duration-500 group-hover:text-orange-300">
                    {ICONS[i]}
                  </span>
                </div>

                <div
                  data-count={it.n}
                  data-suffix={it.suf}
                  data-decimals={it.decimal ? "1" : "0"}
                  data-thousands={it.thousands ? "true" : "false"}
                  className="mt-6 font-display text-[2.6rem] font-bold leading-none tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
                >
                  {formatStat(it)}
                </div>

                <div className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 sm:text-[11px]">
                  {it.label}
                </div>

                <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/12">
                  <div
                    data-bar={String(BAR[i] ?? 60)}
                    style={{ width: `${BAR[i] ?? 60}%` }}
                    className="h-full rounded-full bg-orange-400 shadow-[0_0_12px_rgb(var(--brand-500)/0.7)]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* bottom-left index label */}
          <div className="mt-10 flex items-center gap-3 lg:mt-14">
            <TickMark className="h-3" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
              <span className="text-orange-300">06</span>{" "}
              {lang === "ja" ? "指標" : "Metrics"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
