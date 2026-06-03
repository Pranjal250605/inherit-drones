import { useT } from "../../i18n";
import { Mono, TSection } from "./primitives";

/* TacticalStats — four animated count-up metrics in a 4-col cinematic grid. */
export function TacticalStats() {
  const { t } = useT();

  return (
    <TSection index="06">
      <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4" data-tac="stagger">
        {t.stats.map((s) => (
          <div
            key={s.code}
            data-tac-item
            className="relative bg-[#04060a] px-8 py-10"
          >
            {/* Orange top tick */}
            <span className="absolute left-8 top-0 h-0.5 w-8 bg-orange-500" />

            <Mono className="block">{s.code}</Mono>

            <div className="mt-4">
              <span
                data-tac-count={s.n}
                data-decimals={s.decimal ? "1" : "0"}
                data-suffix={s.suf}
                data-thousands={String(s.thousands)}
                className="font-display text-5xl font-bold text-orange-500 md:text-6xl"
              >
                0
              </span>
            </div>

            <p className="mt-2 text-[13px] leading-snug text-white/55">{s.label}</p>
          </div>
        ))}
      </div>
    </TSection>
  );
}
