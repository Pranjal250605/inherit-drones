import {
  ArrowRight,
  SectionFrame,
  SectionLabel,
  ParallaxImage,
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

/* Fallback photo per card index. */
const FALLBACKS = [droneSpraying, hiroshimaAerial, teamNapa, bvlosCorridor];

export function News() {
  const { t } = useT();
  const items = t.news.items;

  return (
    <SectionFrame
      id="news"
      className="dot-grid-bg relative overflow-hidden bg-bg-alt py-20 md:py-24"
    >
      <div className="mx-auto max-w-[87.5rem] px-6 lg:px-12">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <SectionLabel>{t.news.tag}</SectionLabel>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[12.5px] font-bold uppercase tracking-[0.18em] text-orange-500">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
                </span>
                Live
              </span>
            </div>
            <h2
              data-anim="title-up"
              className="mt-5 font-display text-[3.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-fg md:text-[4.7rem] lg:text-[4.7rem]"
            >
              {t.news.h2_pre}
              {t.news.h2_emph}
              {t.news.h2_post}
            </h2>
            <div className="mt-4 font-jp text-[17px] tracking-[0.08em] text-fg/50">
              {t.news.subtitle_jp}
            </div>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 whitespace-nowrap text-[15px] font-bold uppercase tracking-[0.18em] text-fg/80 transition hover:text-orange-500"
          >
            {t.news.view_all}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-white transition-all duration-300 group-hover:scale-[1.3] group-hover:bg-orange-400 group-hover:shadow-[0_0_20px_rgb(var(--brand-500)/0.5)]">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>

        {/* Uniform grid — every card the same shape/size. */}
        <div
          data-anim="stagger"
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-12"
        >
          {items.map((item, i) => (
            <div key={item.code} data-anim-item className="h-full">
              <NewsCard item={item} fallback={FALLBACKS[i] ?? droneSpraying} />
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

function NewsCard({ item, fallback }: { item: NewsItem; fallback: string }) {
  const { t } = useT();
  const imgSrc = (item.img && IMG[item.img]) || fallback;

  return (
    <a
      href="#contact"
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl text-white shadow-sm transition-shadow duration-500 hover:shadow-xl"
    >
      {/* photo — uniform aspect across all cards */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <ParallaxImage
          src={imgSrc}
          alt={item.title}
          speed={0.1}
          overlay={false}
          className="absolute inset-0 h-full w-full"
        />
      </div>

      {/* solid brand-colour caption block (flex-1 → equal card heights) */}
      <div
        className="flex flex-1 flex-col p-5"
        style={{ backgroundColor: "rgb(var(--brand-500))" }}
      >
        <div className="flex items-center gap-3 font-mono text-[12.5px] font-bold uppercase tracking-[0.18em] text-white/80">
          <span>{item.date}</span>
          <span className="ml-auto">{item.code}</span>
        </div>
        <h3 className="mt-2.5 font-display text-[1.4rem] font-bold leading-[1.2] tracking-[-0.015em] text-white md:text-[1.5rem]">
          {item.title}
        </h3>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold uppercase tracking-[0.16em] text-white">
          {t.news.read_label}
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}
