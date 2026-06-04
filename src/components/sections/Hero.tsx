import { TickMark, ArrowRight } from "../primitives";
import { useT } from "../../i18n";
import businesswoman from "../../assets/businesswoman.jpg";
import hiroshimaAerial from "../../assets/hiroshima-aerial.jpg";
import officeTeam from "../../assets/office-team.jpg";
import teamNapa from "../../assets/team-napa.jpg";

/* Fujitaka-feel hero: a contained light photo mosaic (people-forward) over soft
   abstract background blobs, with ONE big orange brand wordmark straddling the
   mosaic's bottom edge, and a tick + bold heading block below. */
export function Hero() {
  const { t } = useT();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-bg-alt pt-[84px] pb-16 lg:pt-[104px]"
    >
      {/* abstract background shapes (Fujitaka-style organic blobs) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 top-16 h-[34rem] w-[34rem] rounded-[42%_58%_60%_40%/45%_45%_55%_55%] bg-orange-500/[0.07]" />
        <div className="absolute -right-44 bottom-0 h-[42rem] w-[42rem] rounded-[60%_40%_46%_54%/55%_46%_54%_45%] bg-orange-400/[0.10] blur-2xl" />
        <div className="absolute right-1/3 top-1/2 h-72 w-72 rounded-full bg-[#E0A35E]/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 lg:px-8">
        {/* mosaic + wordmark */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-4 lg:h-[58vh] lg:min-h-[480px] lg:grid-cols-12 lg:grid-rows-2">
            {/* big NAPA team photo — the hero subject */}
            <figure className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:col-span-7 lg:row-span-2">
              <img src={teamNapa} alt="NAPA pilot academy team" className="h-full w-full object-cover object-top" loading="eager" />
            </figure>
            {/* cityscape (kept) */}
            <figure className="relative aspect-[16/8] overflow-hidden lg:aspect-auto lg:col-span-5">
              <img src={hiroshimaAerial} alt="Setouchi inland sea" className="h-full w-full object-cover" loading="eager" />
            </figure>
            {/* two small people cells */}
            <div className="grid grid-cols-2 gap-4 lg:col-span-5">
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
