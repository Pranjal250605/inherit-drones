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

/* Per-tile aspect ratios + fallbacks → varied heights make the masonry nest
   like Pinterest. The first tile is the tall "feature". */
const TILES = [
  { aspect: "aspect-[4/5]", feature: true, fallback: droneSpraying },
  { aspect: "aspect-[5/4]", feature: false, fallback: hiroshimaAerial },
  { aspect: "aspect-[4/5]", feature: false, fallback: teamNapa },
  { aspect: "aspect-[16/11]", feature: false, fallback: bvlosCorridor },
];

/* Responsive column count. We build the masonry from REAL flex columns rather
   than CSS multicolumn — multicol re-fragments on hover when a descendant gets
   composited (the parallax/hover transform), which made cards flicker/vanish in
   Chrome. Flex columns avoid that entirely. */
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

  // Distribute items round-robin into `cols` columns (masonry packing).
  const columns: Array<Array<{ item: NewsItem; i: number }>> = Array.from(
    { length: cols },
    (_, c) => items.map((item, i) => ({ item, i })).filter(({ i }) => i % cols === c)
  );

  return (
    <SectionFrame
      id="news"
      className="dot-grid-bg relative overflow-hidden bg-bg-alt py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
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
              className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-fg md:text-5xl lg:whitespace-nowrap lg:text-6xl"
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

        {/* Masonry — Pinterest-style packing via real flex columns. Each column
            ends with a brand "queued" placeholder that grows to flush the
            ragged bottoms (columns stretch to equal height). */}
        <div data-anim="stagger" className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-stretch md:mt-16">
          {columns.map((col, ci) => (
            <div key={ci} className="flex flex-1 flex-col gap-5">
              {col.map(({ item, i }) => {
                const tile = TILES[i] ?? TILES[0];
                return (
                  <div key={item.code} data-anim-item>
                    <NewsCard
                      item={item}
                      aspect={tile.aspect}
                      feature={tile.feature}
                      fallback={tile.fallback}
                    />
                  </div>
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

/* Brand-toned "awaiting dispatch" slot. Grows (flex-1) to flush the ragged
   bottoms of the masonry columns, using the site's surface + grid texture +
   orange instrumentation accents (a radar ping, the "////" tick, skeleton
   lines) so the empty space reads as intentional rather than blank. */
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

      <div className="space-y-2.5">
        <div className="h-2.5 w-3/4 rounded-full bg-fg/[0.07]" />
        <div className="h-2.5 w-1/2 rounded-full bg-fg/[0.07]" />
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/30">
          20XX.XX · ——
        </div>
      </div>
    </div>
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
      {/* brand orange legibility gradient (deep burnt-orange → orange wash →
          clear) — keeps the cards on-brand instead of a grey/charcoal scrim */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(122,40,8,0.95) 0%, rgba(216,75,12,0.66) 30%, rgba(249,115,22,0.26) 55%, transparent 82%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

      {/* dispatch code (top-right corner detail) */}
      <span className="absolute right-4 top-4 z-10 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/75">
        {item.code}
      </span>

      {/* bottom — meta + headline + read (no excerpt) */}
      <div className="relative z-10 p-5 md:p-6">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/75">
          <span className="h-px w-6 bg-white/80" />
          {item.date}
        </div>
        <h3
          className={
            "mt-2.5 font-display font-bold leading-[1.1] tracking-[-0.015em] text-white " +
            (feature ? "text-3xl md:text-4xl" : "text-xl md:text-2xl")
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
