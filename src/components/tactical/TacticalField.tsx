import { useT } from "../../i18n";
import { SectionHead, TSection, GhostButton, Photo } from "./primitives";
import { PHOTOS } from "./photos";

/* TacticalField (#field) — the photo showcase. Three deployments, each given a
   DELIBERATELY different asymmetric layout (varied column spans, vertical
   offsets, overlapping numerals) so the grid never reads as a templated, mirror
   alternation. Photos parallax + wipe in; text floats in the negative space. */

const PHOTO_FOR = [PHOTOS.droneSpraying, PHOTOS.hiroshimaAerial, PHOTOS.teamNapa];

/* per-row composition — intentionally irregular */
const ROWS = [
  {
    // 01 — large landscape photo on the LEFT, text set in from the right edge
    photoWrap: "lg:col-span-7 lg:col-start-1 lg:row-start-1",
    frame: "aspect-[4/3]",
    textWrap: "lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-center",
    numPos: "-left-3 -top-7 lg:-left-6 lg:-top-10",
    statAlign: "",
    speed: 0.07,
  },
  {
    // 02 — tall portrait photo on the RIGHT, pushed DOWN; text high on the left
    photoWrap: "lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-24",
    frame: "aspect-[4/5]",
    textWrap: "lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:self-start",
    numPos: "-right-3 -top-7 lg:-right-6 lg:-top-10",
    statAlign: "",
    speed: 0.13,
  },
  {
    // 03 — wide cinematic photo on the LEFT, slim text column dropped to bottom-right
    photoWrap: "lg:col-span-8 lg:col-start-1 lg:row-start-1",
    frame: "aspect-[16/10]",
    textWrap: "lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:self-end",
    numPos: "-left-3 -top-7 lg:-left-6 lg:-top-10",
    statAlign: "lg:text-right",
    speed: 0.1,
  },
];

export function TacticalField() {
  const { t } = useT();

  return (
    <TSection id="field">
      <SectionHead eyebrow={t.field.tag} jp={t.field.subtitle_jp}>
        {t.field.h2_pre}
        <span className="text-orange-500">{t.field.h2_emph}</span>
        {t.field.h2_post}
      </SectionHead>

      <div className="mt-24 space-y-28 lg:mt-32 lg:space-y-44">
        {t.field.cases.map((c, i) => {
          const row = ROWS[i] ?? ROWS[0];
          return (
            <div key={c.code} className="relative grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-10">
              {/* photo */}
              <div className={"relative " + row.photoWrap}>
                <Photo
                  src={PHOTO_FOR[i] ?? PHOTOS.droneSpraying}
                  alt={c.title}
                  speed={row.speed}
                  className={row.frame + " w-full"}
                />
                {/* oversized index numeral overlapping the photo corner */}
                <span
                  className={
                    "pointer-events-none absolute z-10 select-none font-display text-[5rem] font-bold leading-none tracking-[-0.04em] text-white lg:text-[7rem] " +
                    row.numPos
                  }
                >
                  0{i + 1}
                </span>
              </div>

              {/* text block, floating in the negative space */}
              <div className={"flex flex-col justify-center " + row.textWrap}>
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-orange-500">
                  {c.tag}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold uppercase leading-tight tracking-[-0.02em] text-white sm:text-3xl">
                  {c.title}
                </h3>
                <p className="mt-3 text-[16px] leading-relaxed text-white/55">
                  {c.body}
                </p>
                <div className={"mt-8 " + row.statAlign}>
                  <div className="font-display text-5xl font-bold tracking-[-0.02em] text-orange-500 sm:text-6xl">
                    {c.stat_value}
                  </div>
                  <div className="mt-2 text-[12px] uppercase tracking-[0.16em] text-white/40">
                    {c.stat_label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div data-tac="up" className="mt-24">
        <GhostButton href="#contact">{t.field.cta}</GhostButton>
      </div>
    </TSection>
  );
}
