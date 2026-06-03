import { useT } from "../../i18n";
import { Photo } from "./primitives";
import { PHOTOS } from "./photos";

/* TacticalTestimonial — one large quote over a darkened, parallaxing photo.
   Full-bleed for cinematic depth; the image wipes in behind the words. */
export function TacticalTestimonial() {
  const { t } = useT();
  const tm = t.testimonial;

  return (
    <section className="relative isolate overflow-hidden px-6 py-40 sm:py-52 lg:px-16">
      <div className="absolute inset-0 -z-10">
        <Photo
          src={PHOTOS.teamNapa}
          alt=""
          speed={0.14}
          className="h-full w-full"
        />
        {/* heavy wash so the quote stays the subject */}
        <div className="absolute inset-0 bg-[#04060a]/82" />
      </div>

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
          <div className="mt-1.5 text-[13px] text-white/55">{tm.author_role}</div>
        </figcaption>
      </figure>
    </section>
  );
}
