import { SectionFrame } from "../primitives";
import { useT } from "../../i18n";

export function Stats() {
  const { t } = useT();

  return (
    <SectionFrame
      id="metrics"
      className="diag-top relative overflow-hidden bg-gradient-to-br from-[#F15A29] via-[#EC6A1E] to-[#E08410] py-28 text-white [--diag:3.5rem] md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div
          data-anim="stagger"
          className="grid grid-cols-1 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.stats.map((it) => (
            <div
              key={it.code}
              data-anim-item
              className="border-t border-white/30 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 lg:first:border-l-0 lg:first:pl-0"
            >
              <div
                data-count={it.n}
                data-suffix={it.suf}
                data-decimals={it.decimal ? "1" : "0"}
                data-thousands={it.thousands ? "true" : "false"}
                className="font-display text-6xl font-bold leading-none tracking-[-0.03em] text-white md:text-7xl"
              >
                0{it.suf}
              </div>
              <div className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
                {it.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
