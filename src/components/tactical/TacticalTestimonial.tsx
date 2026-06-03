import { useT } from "../../i18n";
import { Mono, Eyebrow, TSection, Brackets } from "./primitives";

/* TacticalTestimonial (S.07) — incoming-transmission panel with large
   pull-quote, blinking status dot, and author block. */
export function TacticalTestimonial() {
  const { t } = useT();
  const tm = t.testimonial;

  return (
    <TSection index="07">
      <Eyebrow className="justify-center">{tm.tag}</Eyebrow>

      <div
        data-tac="up"
        className="relative mx-auto mt-12 max-w-3xl border border-white/10 p-8 md:p-14"
      >
        <Brackets />

        {/* transmission header row */}
        <div className="mb-8 flex items-center gap-3">
          <Mono className="text-white/55">{tm.transmission_label}</Mono>
          {/* blinking orange dot */}
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 blink" aria-hidden="true" />
          <Mono className="ml-auto text-white/35">{tm.transmission_date}</Mono>
        </div>

        {/* quote */}
        <blockquote>
          <p className="font-display text-2xl font-bold uppercase leading-snug tracking-[-0.02em] text-white md:text-4xl">
            <span className="text-orange-500">"</span>
            {tm.quote}
          </p>

          {/* author block */}
          <footer className="mt-10 flex flex-col gap-1">
            <span className="text-[15px] font-bold text-white">
              {tm.author_name}
            </span>
            <Mono className="text-white/45">{tm.author_role}</Mono>
          </footer>
        </blockquote>

        {/* signed footer — aligned right */}
        <div className="mt-10 flex justify-end">
          <Mono className="text-white/35">{tm.signed}</Mono>
        </div>
      </div>
    </TSection>
  );
}
