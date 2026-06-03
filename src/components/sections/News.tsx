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

type Variant = "big" | "small" | "wide";

export function News() {
  const { t } = useT();
  const items = t.news.items;

  return (
    <SectionFrame id="news" className="dot-grid-bg relative overflow-hidden bg-bg-alt py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <SectionLabel>{t.news.tag}</SectionLabel>
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
            <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-white transition group-hover:bg-orange-400">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>

        {/* Editorial bento: one large feature, two stacked, one wide banner. */}
        <div
          data-anim="card-stagger"
          className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:auto-rows-[minmax(0,1fr)] lg:grid-cols-3"
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
                <NewsCard item={item} variant={variant} />
              </div>
            );
          })}
        </div>
      </div>
    </SectionFrame>
  );
}

function NewsCard({ item, variant }: { item: NewsItem; variant: Variant }) {
  const { t } = useT();
  const imgSrc = item.img ? IMG[item.img] : undefined;
  const wide = variant === "wide";
  const big = variant === "big";

  return (
    <a
      href="#contact"
      className={
        "group card-lift flex h-full overflow-hidden rounded-2xl border border-fg/10 bg-bg shadow-sm hover:border-orange-300 hover:shadow-xl " +
        (wide ? "flex-col sm:flex-row" : "flex-col")
      }
    >
      <div
        className={
          "relative overflow-hidden bg-bg-alt " +
          (big ? "min-h-[240px] flex-1" : wide ? "sm:w-1/2 aspect-[16/9] sm:aspect-auto" : "aspect-[4/3]")
        }
      >
        {imgSrc ? (
          <ParallaxImage
            src={imgSrc}
            alt={item.title}
            speed={big ? 0.2 : 0.12}
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/90 via-[#E9810F] to-[#DB780C]" />
        )}
      </div>

      <div className={"flex flex-1 flex-col p-6 " + (wide ? "sm:justify-center sm:p-8" : "")}>
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em]">
          <span className="text-orange-500">{item.category}</span>
          <span className="font-jp text-[9px] normal-case tracking-[0.06em] text-fg/35">{item.category_jp}</span>
          <span className="h-px flex-1 bg-fg/10" />
          <span className="font-mono text-fg/45">{item.date}</span>
        </div>

        <h3
          className={
            "mt-4 font-display font-semibold leading-[1.25] tracking-[-0.01em] transition group-hover:text-orange-500 " +
            (big || wide ? "text-2xl md:text-3xl" : "text-lg")
          }
        >
          {item.title}
        </h3>

        <p className="mt-3 text-pretty text-[14px] leading-relaxed text-muted">
          {item.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-5">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-fg/35">{item.code}</span>
          <span className="h-px flex-1 bg-fg/8" />
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500 opacity-0 transition-opacity group-hover:opacity-100">
            {t.news.read_label}
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </a>
  );
}
