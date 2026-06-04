import { TickMark, ArrowRight } from "../primitives";
import { useT } from "../../i18n";
import businesswoman from "../../assets/businesswoman.jpg";
import hiroshimaAerial from "../../assets/hiroshima-aerial.jpg";
import officeTeam from "../../assets/office-team.jpg";
import teamNapa from "../../assets/team-napa.jpg";

/* Distinct hero: a dominant lead image + a vertical 3-photo rail (not a symmetric
   bento), with an OUTLINED orange wordmark so the photo reads through it (it
   resonates with the image instead of clashing as a solid block). One screen,
   sharp corners, soft brand blobs behind. */
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
        <div className="absolute -right-48 bottom-0 h-[44rem] w-[44rem] rounded-[60%_40%_46%_54%/55%_46%_54%_45%] bg-orange-400/[0.10] blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1560px] px-4 pb-8 lg:px-6 lg:pb-0">
        <div className="grid grid-cols-1 gap-2.5 lg:h-[calc(100svh-116px)] lg:grid-cols-12 lg:grid-rows-2">
          {/* dominant lead image — top-left */}
          <figure className="relative aspect-[16/9] overflow-hidden lg:col-span-8 lg:row-start-1 lg:aspect-auto">
            <img src={teamNapa} alt="NAPA pilot academy team" className="h-full w-full object-cover object-top" loading="eager" />
            {/* outlined wordmark straddling the lead image's lower band */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-[35%] overflow-hidden px-4 lg:px-0">
              <span
                className="block whitespace-nowrap font-display text-[15vw] font-extrabold uppercase leading-[0.78] tracking-[-0.06em] lg:text-[8.5rem]"
                style={{ WebkitTextStroke: "2.5px #f97316", color: "transparent" }}
              >
                INHERIT
              </span>
            </div>
          </figure>

          {/* vertical 3-photo rail — right, spans both rows */}
          <div className="grid grid-cols-3 gap-2.5 lg:col-span-4 lg:row-span-2 lg:grid-cols-1 lg:grid-rows-3">
            <figure className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
              <img src={hiroshimaAerial} alt="Setouchi inland sea" className="h-full w-full object-cover" loading="eager" />
            </figure>
            <figure className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
              <img src={businesswoman} alt="Inherit team member" className="h-full w-full object-cover object-top" loading="lazy" />
            </figure>
            <figure className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
              <img src={officeTeam} alt="Operations team" className="h-full w-full object-cover" loading="lazy" />
            </figure>
          </div>

          {/* text — bottom-left, wide */}
          <div className="relative z-20 flex flex-col justify-center py-6 lg:col-span-8 lg:row-start-2 lg:pr-12">
            <TickMark className="h-3.5" />
            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.04] tracking-[-0.03em] text-fg md:text-4xl lg:text-5xl">
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
      </div>
    </section>
  );
}
