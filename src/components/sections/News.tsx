import { useEffect, useState } from "react";
import {
  ArrowRight,
  SectionFrame,
  SectionLabel,
  ParallaxImage,
  TickMark,
} from "../primitives";
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

/* Per-tile photo aspect (varied → Pinterest nesting, kept shortish so columns
   don't run long), a punchy solid caption colour, and a fallback image. */
const TILES = [
  { aspect: "aspect-[4/3]", feature: true, fallback: droneSpraying, color: "#F97316" },
  { aspect: "aspect-[1/1]", feature: false, fallback: hiroshimaAerial, color: "#18120E" },
  { aspect: "aspect-[5/4]", feature: false, fallback: teamNapa, color: "#EA580C" },
  { aspect: "aspect-[16/10]", feature: false, fallback: bvlosCorridor, color: "#E08400" },
];

/* Responsive column count for the flex-column masonry (avoids the CSS multicol
   hover-vanish bug). */
function useColumnCount(): number {
  const read = () =>
    typeof window === "undefined"
      ? 3
      : window.innerWidth < 640
      ? 1
      : window.innerWidth < 1024
      ? 2
      : 3;
  const [cols, setCols] = useState(read);
  useEffect(() => {
    const onResize = () => setCols(read());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return cols;
}

export function News() {
  const { t } = useT();
  const items = t.news.items;
  const cols = useColumnCount();

  const columns: Array<Array<{ item: NewsItem; i: number }>> = Array.from(
    { length: cols },
    (_, c) => items.map((item, i) => ({ item, i })).filter(({ i }) => i % cols === c)
  );

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

        {/* Pinterest-style masonry via flex columns. Columns stretch to equal
            height and the queued slot grows to fill each column's leftover space
            (bounded by the tallest column, so it fills without adding length). */}
        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-stretch md:mt-12">
          {columns.map((col, ci) => (
            <div key={ci} className="flex flex-1 flex-col gap-5">
              {col.map(({ item, i }) => {
                const tile = TILES[i] ?? TILES[0];
                return (
                  <NewsCard
                    key={item.code}
                    item={item}
                    aspect={tile.aspect}
                    feature={tile.feature}
                    fallback={tile.fallback}
                    color={tile.color}
                  />
                );
              })}
              <QueuedTile />
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

/* Compact on-brand "awaiting dispatch" slot (fixed height — does NOT grow, so
   it never balloons into a giant empty box). */
function QueuedTile() {
  return (
    <div className="dot-grid-bg relative hidden min-h-[150px] flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-fg/10 bg-bg p-5 shadow-sm sm:flex">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TickMark />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-fg/45">
            Queued
          </span>
        </div>
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500/60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
        </span>
      </div>
      <div className="space-y-2">
        <div className="h-2.5 w-3/4 rounded-full bg-fg/[0.07]" />
        <div className="h-2.5 w-1/2 rounded-full bg-fg/[0.07]" />
      </div>
    </div>
  );
}

function NewsCard({
  item,
  aspect,
  feature,
  fallback,
  color,
}: {
  item: NewsItem;
  aspect: string;
  feature: boolean;
  fallback: string;
  color: string;
}) {
  const { t } = useT();
  const imgSrc = (item.img && IMG[item.img]) || fallback;

  return (
    <a
      href="#contact"
      className="group flex w-full flex-col overflow-hidden rounded-2xl text-white shadow-sm transition-shadow duration-500 hover:shadow-xl"
    >
      {/* photo */}
      <div className={"relative overflow-hidden " + aspect}>
        <ParallaxImage
          src={imgSrc}
          alt={item.title}
          speed={feature ? 0.16 : 0.1}
          overlay={false}
          className="absolute inset-0 h-full w-full"
        />
      </div>

      {/* solid punchy colour caption block */}
      <div className="flex flex-col p-5" style={{ backgroundColor: color }}>
        <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
          <span>{item.date}</span>
          <span className="ml-auto">{item.code}</span>
        </div>
        <h3
          className={
            "mt-2.5 font-display font-bold leading-[1.15] tracking-[-0.015em] text-white " +
            (feature ? "text-2xl md:text-3xl" : "text-lg md:text-xl")
          }
        >
          {item.title}
        </h3>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
          {t.news.read_label}
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}
