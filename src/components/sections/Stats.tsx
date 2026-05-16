import { Mono, Plus } from "../primitives";
import { useT } from "../../i18n";

export function Stats() {
  const { t } = useT();

  return (
    <section className="relative overflow-hidden border-y border-fg/10 bg-bg-alt">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,.04),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-[1500px] grid-cols-2 gap-px bg-fg/10 md:grid-cols-4">
        {t.stats.map((it) => (
          <div
            key={it.code}
            className="group relative bg-bg-alt px-6 py-10 transition hover:bg-bg lg:px-10 lg:py-12"
          >
            <div className="flex items-center justify-between">
              <Mono>{it.code}</Mono>
              <Plus className="h-3 w-3 text-fg/20" />
            </div>
            <div
              data-count={it.n}
              data-suffix={it.suf}
              data-decimals={it.decimal ? "1" : "0"}
              data-thousands={it.thousands ? "true" : "false"}
              className="mt-6 font-display text-4xl font-light leading-none tracking-[-0.02em] text-fg md:text-5xl"
            >
              0{it.suf}
            </div>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/50">
              {it.label}
            </div>
            <div className="absolute bottom-0 left-0 h-px w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
