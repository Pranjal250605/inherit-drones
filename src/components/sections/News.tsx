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

/* Fallback images so every dispatch is image-forward even if `img` is empty. */
const FALLBACK = [droneSpraying, hiroshimaAerial, teamNapa, bvlosCorridor];

type Variant = "big" | "small" | "wide";

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
              {/* live pulse — signals an active newsroom */}
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
            <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-white transition group-hover:bg-orange-400 group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>

        {/* Editorial bento — every dispatch is an image-forward overlay card. */}
        <div
          data-anim="card-stagger"
          className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 lg:auto-rows-[minmax(0,1fr)] lg:grid-cols-3"
        >
          {items.map((item, i) => {
            const variant: Variant = i === 0 ? "big" : i === 3 ? "wide" : "small";
            const cls =
              i === 0
                ? "md:col-span-2 lg:row-span-2"
                : i === 3
                ? "md:col-span-2 lg:col-span-3"
                : "";
            return (
              <div key={item.code} data-anim-item className={cls}>
                <NewsCard item={item} variant={variant} fallback={FALLBACK[i] ?? droneSpraying} />
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
  variant,
  fallback,
}: {
  item: NewsItem;
  variant: Variant;
  fallback: string;
}) {
  const { t } = useT();
  const imgSrc = (item.img && IMG[item.img]) || fallback;
  const big = variant === "big";
  const wide = variant === "wide";

  return (
    <a
      href="#contact"
      className={
        "group card-lift relative flex flex-col justify-end overflow-hidden rounded-2xl border border-fg/10 text-white shadow-sm transition hover:shadow-2xl " +
        (big ? "min-h-[460px]" : wide ? "min-h-[300px]" : "min-h-[222px]")
      }
    >
      {/* image + cinematic gradient */}
      <ParallaxImage
        src={imgSrc}
        alt={item.title}
        speed={big ? 0.18 : 0.1}
        overlay={false}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

      {/* top row — category badge + dispatch code */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5">
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

      {/* bottom content */}
      <div className="relative z-10 p-5 md:p-7">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
          <span className="h-px w-6 bg-orange-400" />
          {item.date}
        </div>
        <h3
          className={
            "mt-3 font-display font-bold leading-[1.15] tracking-[-0.01em] text-white " +
            (big ? "text-2xl md:text-4xl" : wide ? "text-2xl md:text-3xl" : "text-lg")
          }
        >
          {item.title}
        </h3>
        {(big || wide) && (
          <p className="mt-3 max-w-xl text-pretty text-[14px] leading-relaxed text-white/75 line-clamp-2">
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
