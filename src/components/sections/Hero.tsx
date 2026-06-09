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
      {/* abstract background: soft mesh-gradient blobs + aerodynamic line shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* mesh-gradient blobs (orange / amber / cool silver) */}
        <div className="absolute -left-48 top-0 h-[42rem] w-[42rem] rounded-[42%_58%_60%_40%/45%_45%_55%_55%] bg-orange-500/[0.13] blur-[80px]" />
        <div className="absolute -right-52 -top-16 h-[46rem] w-[46rem] rounded-[60%_40%_46%_54%/55%_46%_54%_45%] bg-amber-400/[0.16] blur-[90px]" />
        <div className="absolute -bottom-44 left-1/4 h-[40rem] w-[40rem] rounded-full bg-[#7ea6d4]/[0.16] blur-[120px]" />
        <div className="absolute right-[28%] top-1/3 h-80 w-80 rounded-full bg-orange-300/25 blur-[90px]" />

        {/* technical concentric rings, slowly rotating */}
        <svg
          className="absolute -right-28 top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 text-orange-500/[0.13] motion-safe:animate-[spin_120s_linear_infinite]"
          viewBox="0 0 400 400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="200" cy="200" r="192" strokeDasharray="2 11" />
          <circle cx="200" cy="200" r="150" />
          <circle cx="200" cy="200" r="108" strokeDasharray="22 16" strokeWidth="1.5" />
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45} 200 200)`}>
              <line x1="200" y1="8" x2="200" y2="34" strokeWidth="1.5" />
              <circle cx="200" cy="34" r="2.5" fill="currentColor" />
            </g>
          ))}
        </svg>

        {/* dotted flight arc */}
        <svg
          className="absolute -left-12 bottom-2 h-72 w-[40rem] text-orange-500/25"
          viewBox="0 0 640 280"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M-20 250 C160 40 380 40 660 210" strokeDasharray="1 13" strokeLinecap="round" />
          <circle cx="320" cy="78" r="4" fill="currentColor" />
        </svg>

        {/* faint crosshair marks */}
        {[
          "left-[18%] top-[22%]",
          "right-[14%] top-[16%]",
          "left-[42%] bottom-[12%]",
        ].map((pos) => (
          <span key={pos} className={"absolute text-orange-500/30 " + pos}>
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M8 1v14M1 8h14" />
            </svg>
          </span>
        ))}
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
                <img src={businesswoman} alt="Inherit team member" className="h-full w-full object-cover object-[50%_30%]" loading="lazy" />
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
          <h1 className="mt-4 font-display text-[2.8rem] font-bold leading-[1.05] tracking-[-0.03em] text-fg md:text-[3.75rem] lg:text-[4.7rem]">
            {t.hero.h1_line1_pre}
            <span className="text-orange-500">{t.hero.h1_line1_emph}</span>
            <br />
            {t.hero.h1_line2_pre}
            {t.hero.h1_line2_emph}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-xl leading-relaxed text-muted md:text-[1.4rem]">
            {t.hero.paragraph}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="#solutions"
              className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-orange-500 px-7 py-3.5 text-[16px] font-bold tracking-[0.03em] text-white transition hover:bg-orange-400"
            >
              {t.hero.cta_primary}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#technology"
              className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-fg/20 px-7 py-3.5 text-[16px] font-semibold tracking-[0.03em] text-fg transition hover:border-orange-500 hover:text-orange-500"
            >
              {t.hero.cta_secondary}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
