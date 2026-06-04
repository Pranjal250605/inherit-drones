import { TickMark, ArrowRight } from "../primitives";
import { useT } from "../../i18n";
import hiroshimaAerial from "../../assets/hiroshima-aerial.jpg";
import droneSpraying from "../../assets/drone-spraying.jpg";
import teamNapa from "../../assets/team-napa.jpg";

/* Fujitaka-feel hero: a contained light photo mosaic with ONE big orange brand
   wordmark straddling the bottom edge (over the lower image band, not faces),
   and a tick + bold heading block below. Distinct via the Inherit orange + copy. */
export function Hero() {
  const { t } = useT();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-bg-alt pt-[84px] pb-16 lg:pt-[104px]"
    >
      <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
        {/* mosaic + wordmark */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-4 lg:h-[56vh] lg:min-h-[460px] lg:grid-cols-12 lg:grid-rows-2">
            <figure className="relative aspect-[16/11] overflow-hidden rounded-[1.75rem] lg:aspect-auto lg:col-span-7 lg:row-span-2">
              <img src={teamNapa} alt="INHERIT pilot team" className="h-full w-full object-cover" loading="eager" />
            </figure>
            <figure className="relative aspect-[16/8] overflow-hidden rounded-[1.75rem] lg:aspect-auto lg:col-span-5">
              <img src={hiroshimaAerial} alt="Setouchi inland sea" className="h-full w-full object-cover" loading="eager" />
            </figure>
            <figure className="relative aspect-[16/8] overflow-hidden rounded-[1.75rem] lg:aspect-auto lg:col-span-5">
              <img src={droneSpraying} alt="IH-04 on a field mission" className="h-full w-full object-cover" loading="lazy" />
            </figure>
          </div>

          {/* single oversized wordmark, straddling the mosaic's bottom edge */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-1/2 overflow-hidden">
            <span className="block whitespace-nowrap font-display text-[17vw] font-extrabold uppercase leading-[0.8] tracking-[-0.06em] text-orange-500 lg:text-[9.5rem]">
              INHERIT
            </span>
          </div>
        </div>

        {/* heading block */}
        <div className="mt-24 max-w-3xl lg:mt-28">
          <TickMark className="h-4" />
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-fg md:text-5xl lg:text-6xl">
            {t.hero.h1_line1_pre}
            <span className="text-orange-500">{t.hero.h1_line1_emph}</span>{" "}
            {t.hero.h1_line2_pre}
            {t.hero.h1_line2_emph}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-[16px] leading-relaxed text-muted md:text-lg">
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
    </section>
  );
}
