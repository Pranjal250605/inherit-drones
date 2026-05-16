import { Mono } from "../primitives";
import { useT } from "../../i18n";

export function TrustStrip() {
  const { t } = useT();
  const partners = t.trust.partners;

  return (
    <section className="relative border-y border-fg/10 bg-bg">
      <div className="mx-auto flex max-w-[1500px] items-center gap-8 px-6 py-5 lg:px-10">
        <Mono className="shrink-0">{t.trust.label}</Mono>
        <div className="relative flex-1 overflow-hidden">
          <div className="marquee flex w-max items-center gap-12">
            {[...partners, ...partners].map((x, i) => (
              <span
                key={i}
                className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-fg/40"
              >
                {x}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent" />
        </div>
      </div>
    </section>
  );
}
