import { TSection } from "./primitives";
import { useT } from "../../i18n";

/* TacticalStats — four headline numbers, wide apart. */
export function TacticalStats() {
  const { t } = useT();

  return (
    <TSection>
      <div
        data-tac="stagger"
        className="grid grid-cols-2 gap-x-8 gap-y-16 lg:grid-cols-4"
      >
        {t.stats.map((s) => (
          <div key={s.code} data-tac-item>
            <span
              data-tac-count={s.n}
              data-decimals={s.decimal ? "1" : "0"}
              data-suffix={s.suf}
              data-thousands={String(s.thousands)}
              className="font-display text-6xl font-bold tracking-[-0.03em] text-orange-500 md:text-7xl"
            >
              0
            </span>
            <p className="mt-4 text-[14px] leading-snug text-white/55">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </TSection>
  );
}
