import { SectionFrame } from "../primitives";
import { useT, type Dict } from "../../i18n";

/* Per-column vertical offsets so the row of figures reads as a staggered,
   hand-composed grid rather than a flat even rule. */
const OFFSET = ["lg:mt-0", "lg:mt-12", "lg:mt-4", "lg:mt-16"];

/* Final formatted value — rendered as the DEFAULT text so the real number is
   always present (no-JS, SSR, and prefers-reduced-motion all show it). The
   GSAP count-up only animates it as a progressive enhancement. */
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

export function Stats() {
  const { t } = useT();

  return (
    <SectionFrame
      id="metrics"
      className="diag-top relative overflow-hidden bg-gradient-to-br from-[#F15A29] via-[#EC6A1E] to-[#E08410] py-28 text-white [--diag:3.5rem] md:py-36"
    >
      {/* soft texture: faint concentric glow, off-center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 h-[26rem] w-[26rem] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div
          data-anim="stagger"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-start"
        >
          {t.stats.map((it, i) => (
            <div
              key={it.code}
              data-anim-item
              className={
                "glass-dark rounded-2xl p-7 " + (OFFSET[i] ?? "")
              }
            >
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">
                {it.code}
              </div>
              <div
                data-count={it.n}
                data-suffix={it.suf}
                data-decimals={it.decimal ? "1" : "0"}
                data-thousands={it.thousands ? "true" : "false"}
                className="mt-5 font-display text-6xl font-bold leading-none tracking-[-0.03em] text-white md:text-7xl"
              >
                {formatStat(it)}
              </div>
              <div className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                {it.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
