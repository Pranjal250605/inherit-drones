import { useT } from "../../i18n";

export function TrustStrip() {
  const { t } = useT();
  const partners = t.trust.partners;

  return (
    <section className="relative border-y border-fg/10 bg-bg">
      <div className="mx-auto flex max-w-[93.75rem] items-center gap-8 px-6 py-6 lg:px-10">
        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.2em] text-fg/70">
          {t.trust.label}
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div
            data-marquee
            className="flex w-max items-center gap-12 will-change-transform"
          >
            {[...partners, ...partners].map((x, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-[13px] font-medium tracking-[0.04em] text-fg/55"
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
