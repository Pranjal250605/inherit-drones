import { TickMark, ArrowRight } from "../primitives";
import { useT } from "../../i18n";
import businesswoman from "../../assets/businesswoman.jpg";
import hiroshimaTorii from "../../assets/hiroshima-torii.jpg";
import officeTeam from "../../assets/office-team.jpg";
import teamNapa from "../../assets/team-napa.jpg";

/* People-forward photo mosaic (sharp corners) + a big orange wordmark straddling
   the mosaic's bottom edge + heading block — all squeezed into one viewport on
   desktop via a flex column (mosaic flexes, heading stays in frame). */
export function Hero() {
  const { t } = useT();

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-[5.25rem] pb-8 lg:pt-[6rem] lg:pb-8"
    >
      {/* abstract background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 top-16 h-[34rem] w-[34rem] rounded-[42%_58%_60%_40%/45%_45%_55%_55%] bg-orange-500/[0.07]" />
        <div className="absolute -right-44 bottom-0 h-[42rem] w-[42rem] rounded-[60%_40%_46%_54%/55%_46%_54%_45%] bg-orange-400/[0.10] blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-5 lg:px-8">
        {/* mosaic + wordmark */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-3 lg:h-[44vh] lg:min-h-[21.25rem] lg:grid-cols-12 lg:grid-rows-2">
            {/* big NAPA team photo */}
            <figure className="relative aspect-[4/3] overflow-hidden lg:col-span-7 lg:row-span-2 lg:aspect-auto">
              <img src={teamNapa} alt="NAPA pilot academy team" className="h-full w-full object-cover object-top" loading="eager" />
            </figure>
            {/* Itsukushima floating torii — Hiroshima's cultural icon */}
            <figure className="relative aspect-[16/8] overflow-hidden lg:col-span-5 lg:aspect-auto">
              <img src={hiroshimaTorii} alt="Itsukushima floating torii — Miyajima, Hiroshima" className="h-full w-full object-cover" loading="eager" />
            </figure>
            {/* two small people cells */}
            <div className="grid grid-cols-2 gap-3 lg:col-span-5">
              <figure className="relative aspect-square overflow-hidden lg:aspect-auto">
                <img src={businesswoman} alt="Inherit team member" className="h-full w-full object-cover object-top" loading="lazy" />
              </figure>
              <figure className="relative aspect-square overflow-hidden lg:aspect-auto">
                <img src={officeTeam} alt="Operations team" className="h-full w-full object-cover" loading="lazy" />
              </figure>
            </div>
          </div>

          {/* single oversized wordmark, straddling the mosaic's bottom edge */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-1/2 overflow-hidden">
            <span className="block whitespace-nowrap font-display text-[16vw] font-extrabold uppercase leading-[0.8] tracking-[-0.06em] text-orange-500 lg:text-[7.5rem]">
              INHERIT
            </span>
          </div>
        </div>

        {/* heading block — stays in frame */}
        <div className="mt-14 max-w-3xl lg:mt-12">
          <TickMark className="h-3.5" />
          <h1 className="mt-4 font-display text-3xl font-bold leading-[1.03] tracking-[-0.03em] text-fg md:text-4xl lg:text-5xl">
            {t.hero.h1_line1_pre}
            <span className="text-orange-500">{t.hero.h1_line1_emph}</span>{" "}
            {t.hero.h1_line2_pre}
            {t.hero.h1_line2_emph}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-muted md:text-base">
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
      </div>
    </section>
  );
}
