import { TickMark, ArrowRight } from "../primitives";
import { useT } from "../../i18n";
import businesswoman from "../../assets/businesswoman.jpg";
import hiroshimaAerial from "../../assets/hiroshima-aerial.jpg";
import officeTeam from "../../assets/office-team.jpg";
import teamNapa from "../../assets/team-napa.jpg";

/* Fujitaka-feel hero: a one-screen photo collage with SHARP corners — big NAPA
   team top-left, text in the bottom-left cell, cityscape top-right, two people
   cells bottom-right — over soft abstract shapes, with one big orange wordmark
   laid across the middle. */
export function Hero() {
  const { t } = useT();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-bg-alt pt-[84px] lg:pt-[100px]"
    >
      {/* abstract background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-[42%_58%_60%_40%/45%_45%_55%_55%] bg-orange-500/[0.07]" />
        <div className="absolute -right-44 bottom-0 h-[42rem] w-[42rem] rounded-[60%_40%_46%_54%/55%_46%_54%_45%] bg-orange-400/[0.10] blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1560px] px-4 pb-8 lg:px-6 lg:pb-0">
        <div className="grid grid-cols-1 gap-2.5 lg:h-[calc(100svh-116px)] lg:grid-cols-12 lg:grid-rows-2">
          {/* big NAPA team — top-left */}
          <figure className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto">
            <img src={teamNapa} alt="NAPA pilot academy team" className="h-full w-full object-cover object-top" loading="eager" />
          </figure>

          {/* cityscape — top-right */}
          <figure className="relative aspect-[16/9] overflow-hidden lg:col-span-5 lg:aspect-auto">
            <img src={hiroshimaAerial} alt="Setouchi inland sea" className="h-full w-full object-cover" loading="eager" />
          </figure>

          {/* text — bottom-left cell */}
          <div className="relative z-20 flex flex-col justify-center py-6 lg:col-span-7 lg:row-start-2 lg:pr-10">
            <TickMark className="h-3.5" />
            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-fg md:text-4xl lg:text-5xl">
              {t.hero.h1_line1_pre}
              <span className="text-orange-500">{t.hero.h1_line1_emph}</span>{" "}
              {t.hero.h1_line2_pre}
              {t.hero.h1_line2_emph}
            </h1>
            <p className="mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-muted md:text-base">
              {t.hero.paragraph}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#solutions"
                className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-orange-500 px-6 py-3 text-[13px] font-bold tracking-[0.03em] text-white transition hover:bg-orange-400"
              >
                {t.hero.cta_primary}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </a>
              <a
                href="#technology"
                className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-fg/20 px-6 py-3 text-[13px] font-semibold tracking-[0.03em] text-fg transition hover:border-orange-500 hover:text-orange-500"
              >
                {t.hero.cta_secondary}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* two people cells — bottom-right */}
          <div className="grid grid-cols-2 gap-2.5 lg:col-span-5 lg:row-start-2">
            <figure className="relative aspect-square overflow-hidden lg:aspect-auto">
              <img src={businesswoman} alt="Inherit team member" className="h-full w-full object-cover object-top" loading="lazy" />
            </figure>
            <figure className="relative aspect-square overflow-hidden lg:aspect-auto">
              <img src={officeTeam} alt="Operations team" className="h-full w-full object-cover" loading="lazy" />
            </figure>
          </div>
        </div>
      </div>

      {/* single oversized wordmark across the middle */}
      <div className="pointer-events-none absolute inset-x-0 top-[46%] z-[15] -translate-y-1/2 overflow-hidden">
        <div className="mx-auto max-w-[1560px] px-4 lg:px-6">
          <span className="block whitespace-nowrap font-display text-[16vw] font-extrabold uppercase leading-[0.8] tracking-[-0.06em] text-orange-500 lg:text-[8.5rem]">
            INHERIT
          </span>
        </div>
      </div>
    </section>
  );
}
