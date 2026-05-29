import { ArrowRight, SectionFrame, SectionLabel } from "../primitives";
import { useT, type Dict } from "../../i18n";
import droneSpraying from "../../assets/drone-spraying.jpg";
import hiroshimaAerial from "../../assets/hiroshima-aerial.jpg";
import teamNapa from "../../assets/team-napa.jpg";

type NewsItem = Dict["news"]["items"][number];

const IMG: Record<string, string> = {
  "drone-spraying": droneSpraying,
  "hiroshima-aerial": hiroshimaAerial,
  "team-napa": teamNapa,
};

export function News() {
  const { t } = useT();

  return (
    <SectionFrame id="news" className="bg-bg-alt py-24 md:py-32">
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

        <div
          data-anim="card-stagger"
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-4"
        >
          {t.news.items.map((item) => (
            <div key={item.code} data-anim-item>
              <NewsCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  const imgSrc = item.img ? IMG[item.img] : undefined;

  return (
    <a
      href="#contact"
      className="group card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-fg/10 bg-bg shadow-sm hover:border-orange-300 hover:shadow-xl"
    >
      <div
        data-anim="img-reveal"
        className="relative aspect-[4/3] overflow-hidden bg-bg-alt"
      >
        {imgSrc ? (
          <>
            <img
              src={imgSrc}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.04)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.04)_50%,rgba(0,0,0,0.04)_75%,transparent_75%)] bg-[length:14px_14px]" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em]">
          <span className="text-orange-500">{item.category}</span>
          <span className="h-px flex-1 bg-fg/10" />
          <span className="font-mono text-fg/45">{item.date}</span>
        </div>

        <h3 className="mt-4 font-display text-lg font-semibold leading-[1.3] tracking-[-0.01em] transition group-hover:text-orange-500">
          {item.title}
        </h3>

        <p className="mt-3 text-pretty text-[14px] leading-relaxed text-muted">
          {item.excerpt}
        </p>
      </div>
    </a>
  );
}
