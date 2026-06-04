import { TickMark, ArrowRight } from "../primitives";
import { useT } from "../../i18n";
import hiroshimaAerial from "../../assets/hiroshima-aerial.jpg";
import droneSpraying from "../../assets/drone-spraying.jpg";
import teamNapa from "../../assets/team-napa.jpg";

/* Fujitaka-feel hero: a light photo mosaic (big left + cityscape + small cells)
   with a giant orange brand wordmark marquee laid across the images, and a
   tick + bold heading text panel anchored bottom-left. Kept distinct with the
   Inherit orange + our own copy/imagery. */
export function Hero() {
  const { t } = useT();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-bg-alt pt-[72px] lg:pt-[92px]"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-3 p-3 lg:h-[calc(100svh-92px)] lg:grid-cols-12">
        {/* LEFT — big image + text panel */}
        <div className="flex flex-col gap-3 lg:col-span-7">
          <figure className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] lg:aspect-auto lg:flex-1">
            <img
              src={teamNapa}
              alt="INHERIT pilot team"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </figure>

          <div
            data-hero="content"
            className="relative z-30 flex flex-col justify-center rounded-[1.75rem] bg-bg p-8 shadow-sm lg:p-12"
          >
            <TickMark className="h-4" />
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-fg md:text-5xl lg:text-6xl">
              {t.hero.h1_line1_pre}
              <span className="text-orange-500">{t.hero.h1_line1_emph}</span>{" "}
              {t.hero.h1_line2_pre}
              {t.hero.h1_line2_emph}
            </h1>
            <p className="mt-5 max-w-lg text-pretty text-[16px] leading-relaxed text-muted md:text-lg">
              {t.hero.paragraph}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#solutions"
                className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-orange-500 px-7 py-3.5 text-[13px] font-bold tracking-[0.03em] text-white transition hover:bg-orange-400"
              >
                {t.hero.cta_primary}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </a>
              <a
                href="#technology"
                className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-fg/20 px-7 py-3.5 text-[13px] font-semibold tracking-[0.03em] text-fg transition hover:border-orange-500 hover:text-orange-500"
              >
                {t.hero.cta_secondary}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — cityscape + two small cells */}
        <div className="flex flex-col gap-3 lg:col-span-5">
          <figure className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] lg:aspect-auto lg:flex-1">
            <img
              src={hiroshimaAerial}
              alt="Setouchi inland sea"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </figure>
          <div className="grid grid-cols-2 gap-3 lg:flex-1">
            <figure className="relative aspect-square overflow-hidden rounded-[1.75rem] lg:aspect-auto">
              <img
                src={droneSpraying}
                alt="IH-04 on a field mission"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </figure>
            <figure className="relative aspect-square overflow-hidden rounded-[1.75rem] lg:aspect-auto">
              <img
                src={hiroshimaAerial}
                alt="Coastal corridor"
                className="h-full w-full object-cover object-bottom"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </div>

      {/* giant orange brand wordmark, laid across the mosaic */}
      <div
        data-hero="ticker"
        className="pointer-events-none absolute inset-x-0 top-[44%] z-20 -translate-y-1/2 overflow-hidden lg:top-[46%]"
      >
        <div className="marquee flex w-max items-center gap-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-[16vw] font-extrabold uppercase leading-none tracking-[-0.05em] text-orange-500 lg:text-[9.5rem]"
            >
              INHERIT
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
