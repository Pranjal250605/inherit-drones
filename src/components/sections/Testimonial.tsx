import { SectionFrame, SectionLabel } from "../primitives";
import { useT } from "../../i18n";

export function Testimonial() {
  const { t } = useT();

  return (
    <SectionFrame
      id="voice"
      className="section-fade-top relative overflow-hidden bg-bg py-24 md:py-32"
    >
      {/* oversized drifting quote mark — depth + asymmetry */}
      <span
        aria-hidden="true"
        data-anim="parallax"
        data-speed="0.28"
        className="pointer-events-none absolute -top-16 right-2 select-none font-display text-[14rem] font-bold leading-none text-orange-500/10 md:right-16 md:text-[22rem]"
      >
        ”
      </span>

      <div className="relative mx-auto max-w-[68.75rem] px-6 lg:px-12">
        <SectionLabel>{t.testimonial.tag}</SectionLabel>

        <blockquote
          data-anim="title-up"
          className="mt-10 max-w-5xl text-balance font-display text-4xl font-semibold leading-[1.25] tracking-[-0.02em] text-fg md:pr-12 md:text-6xl"
        >
          <span className="text-orange-500">“</span>
          {t.testimonial.quote}
          <span className="text-orange-500">”</span>
        </blockquote>

        <div className="mt-14 md:ml-16">
          <div className="font-display text-xl font-bold text-fg md:text-2xl">
            {t.testimonial.author_name}
          </div>
          <div className="mt-2 font-mono text-[13px] font-semibold uppercase tracking-[0.18em] text-fg/55">
            {t.testimonial.author_role}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
