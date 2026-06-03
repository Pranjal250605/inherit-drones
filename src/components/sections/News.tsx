import { ArrowRight, SectionFrame, SectionLabel, ParallaxImage } from "../primitives";
import { useT, type Dict } from "../../i18n";
import droneSpraying from "../../assets/drone-spraying.jpg";
import hiroshimaAerial from "../../assets/hiroshima-aerial.jpg";
import teamNapa from "../../assets/team-napa.jpg";
import bvlosCorridor from "../../assets/bvlos-corridor.png";

type NewsItem = Dict["news"]["items"][number];

const IMG: Record<string, string> = {
  "drone-spraying": droneSpraying,
  "hiroshima-aerial": hiroshimaAerial,
  "team-napa": teamNapa,
  "bvlos-corridor": bvlosCorridor,
};

/* Per-tile aspect ratios + fallbacks. Varied heights are what make the masonry
   pack like Pinterest — tiles of different shapes nest tightly into the columns
   instead of sitting in a rigid grid. The first tile is the tall "feature". */
const TILES = [
  { aspect: "aspect-[4/5]", feature: true, fallback: droneSpraying },
  { aspect: "aspect-[5/4]", feature: false, fallback: hiroshimaAerial },
  { aspect: "aspect-[4/5]", feature: false, fallback: teamNapa },
  { aspect: "aspect-[16/11]", feature: false, fallback: bvlosCorridor },
];

export function News() {
  const { t } = useT();
  const items = t.news.items;

  return (
    <SectionFrame
      id="news"
      className="dot-grid-bg relative overflow-hidden bg-bg-alt py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <SectionLabel>{t.news.tag}</SectionLabel>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
                </span>
                Live
              </span>
            </div>
            <h2
              data-anim="title-up"
              className="mt-6 font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-fg md:text-6xl"
            >
              {t.news.h2_pre}
              {t.news.h2_emph}
              {t.news.h2_post}
            </h2>
            <div className="mt-5 font-jp text-[12px] tracking-[0.08em] text-fg/50">
              {t.news.subtitle_jp}
            </div>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.18em] text-fg/80 transition hover:text-orange-500"
          >
            {t.news.view_all}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-white transition group-hover:translate-x-0.5 group-hover:bg-orange-400">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>

        {/* Masonry — Pinterest-style: tiles of different heights flow and pack
            into balanced columns (CSS multicol + break-inside-avoid). */}
        <div
          data-anim="stagger"
          className="mt-12 gap-5 [column-fill:balance] columns-1 sm:columns-2 lg:columns-3 md:mt-16"
        >
          {items.map((item, i) => {
            const tile = TILES[i] ?? TILES[0];
            return (
              <div key={item.code} data-anim-item className="mb-5 break-inside-avoid">
                <NewsCard
                  item={item}
                  aspect={tile.aspect}
                  feature={tile.feature}
                  fallback={tile.fallback}
                />
              </div>
            );
          })}
        </div>
      </div>
    </SectionFrame>
  );
}

function NewsCard({
  item,
  aspect,
  feature,
  fallback,
}: {
  item: NewsItem;
  aspect: string;
  feature: boolean;
  fallback: string;
}) {
  const { t } = useT();
  const imgSrc = (item.img && IMG[item.img]) || fallback;

  return (
    <a
      href="#contact"
      className={
        "group relative flex w-full flex-col justify-end overflow-hidden rounded-2xl border border-fg/10 text-white shadow-sm transition-shadow duration-500 hover:shadow-2xl " +
        aspect
      }
    >
      <ParallaxImage
        src={imgSrc}
        alt={item.title}
        speed={feature ? 0.16 : 0.1}
        overlay={false}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

      {/* top — category badge + dispatch code */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-black/20">
          {item.category}
          <span className="font-jp text-[9px] font-normal tracking-[0.04em] text-white/80">
            {item.category_jp}
          </span>
        </span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/75">
          {item.code}
        </span>
      </div>

      {/* bottom — meta + headline + (feature) excerpt + read */}
      <div className="relative z-10 p-5 md:p-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
          <span className="h-px w-6 bg-orange-400" />
          {item.date}
        </div>
        <h3
          className={
            "mt-2.5 font-display font-bold leading-[1.14] tracking-[-0.01em] text-white " +
            (feature ? "text-2xl md:text-3xl" : "text-lg md:text-xl")
          }
        >
          {item.title}
        </h3>
        {feature && (
          <p className="mt-3 text-pretty text-[13.5px] leading-relaxed text-white/75 line-clamp-2">
            {item.excerpt}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-300">
          {t.news.read_label}
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}
