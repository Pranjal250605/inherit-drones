import { useT } from "../../i18n";
import { TSection } from "./primitives";

/* TacticalTestimonial — a single large quote in open space. */
export function TacticalTestimonial() {
  const { t } = useT();
  const tm = t.testimonial;

  return (
    <TSection>
      <figure data-tac="up" className="mx-auto max-w-4xl text-center">
        <blockquote className="font-display text-3xl font-medium leading-[1.18] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl">
          <span className="text-orange-500">“</span>
          {tm.quote}
          <span className="text-orange-500">”</span>
        </blockquote>
        <figcaption className="mt-12">
          <div className="text-[15px] font-bold uppercase tracking-[0.06em] text-white">
            {tm.author_name}
          </div>
          <div className="mt-1.5 text-[13px] text-white/45">
            {tm.author_role}
          </div>
        </figcaption>
      </figure>
    </TSection>
  );
}
