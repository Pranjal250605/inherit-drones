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

/* Per-card fallback image + a punchy solid caption colour (brand orange shades
   + one ink card for contrast). */
const CARDS = [
  { fallback: droneSpraying, color: "#F97316" },
  { fallback: hiroshimaAerial, color: "#18120E" },
  { fallback: teamNapa, color: "#EA580C" },
  { fallback: bvlosCorridor, color: "#E08400" },
];

export function News() {
  const { t } = useT();
  const items = t.news.items;

  return (
    <SectionFrame
      id="news"
      className="dot-grid-bg relative overflow-hidden bg-bg-alt py-20 md:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
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
              className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-fg md:text-5xl lg:whitespace-nowrap lg:text-6xl"
            >
              {t.news.h2_pre}
              {t.news.h2_emph}
              {t.news.h2_post}
            </h2>
            <div className="mt-4 font-jp text-[12px] tracking-[0.08em] text-fg/50">
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

        {/* Compact uniform row — equal-height cards, fits in one screen. */}
        <div
          data-anim="card-stagger"
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-4"
        >
          {items.map((item, i) => {
            const cfg = CARDS[i % CARDS.length] ?? CARDS[0];
            return (
              <div key={item.code} data-anim-item>
                <NewsCard item={item} fallback={cfg.fallback} color={cfg.color} />
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
  fallback,
  color,
}: {
  item: NewsItem;
  fallback: string;
  color: string;
}) {
  const { t } = useT();
  const imgSrc = (item.img && IMG[item.img]) || fallback;

  return (
    <a
      href="#contact"
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl text-white shadow-sm transition-shadow duration-500 hover:shadow-xl"
    >
      {/* photo */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <ParallaxImage
          src={imgSrc}
          alt={item.title}
          speed={0.1}
          overlay={false}
          className="absolute inset-0 h-full w-full"
        />
      </div>

      {/* solid punchy colour caption block */}
      <div
        className="flex flex-1 flex-col p-5"
        style={{ backgroundColor: color }}
      >
        <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
          <span>{item.date}</span>
          <span className="ml-auto">{item.code}</span>
        </div>
        <h3 className="mt-2.5 font-display text-lg font-bold leading-[1.18] tracking-[-0.01em] text-white line-clamp-3 md:text-xl">
          {item.title}
        </h3>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
          {t.news.read_label}
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}
