import { ArrowRight, SectionFrame, SectionLabel } from "../primitives";
import { useT, type Dict } from "../../i18n";
import droneSpraying from "../../assets/drone-spraying.jpg";
import hiroshimaAerial from "../../assets/hiroshima-aerial.jpg";

type CaseStudy = Dict["field"]["cases"][number];

const IMAGES: Record<number, string> = {
  0: droneSpraying,
  2: hiroshimaAerial,
};

export function UseCases() {
  const { t } = useT();
  const cases = t.field.cases;

  return (
    <SectionFrame id="field" className="overflow-hidden bg-bg py-24 md:py-32">
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <header className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <SectionLabel>{t.field.tag}</SectionLabel>
            <h2
              data-anim="title-up"
              className="mt-6 font-display text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-fg md:text-6xl"
            >
              {t.field.h2_pre}
              {t.field.h2_emph}
              {t.field.h2_post}
            </h2>
            <div className="mt-5 font-jp text-[12px] tracking-[0.08em] text-fg/50">
              {t.field.subtitle_jp}
            </div>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.18em] text-fg/80 transition-colors hover:text-orange-500"
          >
            {t.field.cta}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-white transition group-hover:bg-orange-400">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </header>

        <div data-anim="card-stagger" className="mt-16 flex flex-col gap-20 md:mt-20">
          {cases.map((c, i) => (
            <div key={c.code} data-anim-item>
              <FieldCase c={c} imgSrc={IMAGES[i]} flip={i % 2 === 1} lead={i === 0} />
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

function FieldCase({
  c,
  imgSrc,
  flip = false,
  lead = false,
}: {
  c: CaseStudy;
  imgSrc?: string;
  flip?: boolean;
  lead?: boolean;
}) {
  return (
    <article className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
      <figure
        className={
          "md:col-span-7 " + (flip ? "md:order-2" : "md:order-1")
        }
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-md">
          {imgSrc ? (
            <img
              data-anim={lead ? "parallax" : undefined}
              data-speed={lead ? "0.12" : undefined}
              src={imgSrc}
              alt={c.title}
              className="absolute inset-0 h-[120%] w-full -translate-y-[10%] scale-105 object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.04)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.04)_50%,rgba(0,0,0,0.04)_75%,transparent_75%)] bg-[length:16px_16px]" />
          )}
        </div>
      </figure>

      <div
        className={
          "md:col-span-5 " + (flip ? "md:order-1" : "md:order-2")
        }
      >
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-500">
          {c.tag}
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold leading-[1.08] tracking-[-0.02em] text-fg md:text-3xl">
          {c.title}
        </h3>
        <p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-muted md:text-base">
          {c.body}
        </p>

        <div className="mt-8 border-t-2 border-orange-500/70 pt-6">
          <div className="font-display text-3xl font-bold leading-none tracking-[-0.02em] text-fg md:text-4xl">
            {c.stat_value}
          </div>
          <div className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/55">
            {c.stat_label}
          </div>
        </div>
      </div>
    </article>
  );
}
