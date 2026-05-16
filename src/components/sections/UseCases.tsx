import {
  BracketTitle,
  CornerBrackets,
  Dot,
  Mono,
  SectionFrame,
  Tag,
} from "../primitives";
import { useT, type Dict } from "../../i18n";
import droneSpraying from "../../assets/drone-spraying.jpg";
import hiroshimaAerial from "../../assets/hiroshima-aerial.jpg";

type CaseStudy = Dict["field"]["cases"][number];

export function UseCases() {
  const { t } = useT();
  const cases = t.field.cases;
  const first = cases[0];
  const second = cases[1];
  const third = cases[2];

  return (
    <SectionFrame id="field" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <header className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Tag>{t.field.tag}</Tag>
            <h2
              data-anim="title-up"
              className="mt-8 font-display text-3xl font-light leading-[1.15] tracking-[-0.015em] md:text-4xl"
            >
              {t.field.h2_pre}
              <span className="italic text-orange-400">{t.field.h2_emph}</span>
              {t.field.h2_post}
            </h2>
            <div className="mt-5 font-jp text-[11px] tracking-[0.05em] text-fg/30">
              {t.field.subtitle_jp}
            </div>
          </div>
          <a
            href="#contact"
            className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg/60 hover:text-orange-400"
          >
            {t.field.cta}
          </a>
        </header>

        <div data-anim="card-stagger" className="mt-14 grid grid-cols-12 gap-6">
          {first && (
            <div data-anim-item className="col-span-12 md:col-span-7">
              <FieldCard c={first} large imgSrc={droneSpraying} imgLabel={t.field.img_label} recLabel={t.field.rec_label} openLabel={t.field.open} />
            </div>
          )}
          <div data-anim-item className="col-span-12 flex flex-col gap-6 md:col-span-5">
            {second && (
              <FieldCard c={second} imgLabel={t.field.img_label} recLabel={t.field.rec_label} openLabel={t.field.open} />
            )}
            {third && (
              <FieldCard c={third} imgSrc={hiroshimaAerial} imgLabel={t.field.img_label} recLabel={t.field.rec_label} openLabel={t.field.open} />
            )}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function FieldCard({
  c,
  large = false,
  className = "",
  imgSrc,
  imgLabel,
  recLabel,
  openLabel,
}: {
  c: CaseStudy;
  large?: boolean;
  className?: string;
  imgSrc?: string;
  imgLabel: string;
  recLabel: string;
  openLabel: string;
}) {
  return (
    <article
      className={
        "group relative overflow-hidden border border-fg/10 bg-gradient-to-b from-fg/[0.03] to-transparent p-8 transition hover:border-orange-400/50 " +
        className
      }
    >
      <CornerBrackets />

      <div
        data-anim="img-reveal"
        className={
          "relative overflow-hidden border border-fg/10 bg-[radial-gradient(circle_at_30%_30%,rgba(249,115,22,0.10),transparent_60%)] " +
          (large ? "aspect-[16/9]" : "aspect-[16/8]")
        }
      >
        {imgSrc ? (
          <>
            <img
              src={imgSrc}
              alt={c.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/45" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.04)_50%,rgba(255,255,255,0.04)_75%,transparent_75%)] bg-[length:14px_14px]" />
        )}
        <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/70 mix-blend-difference">
          {imgLabel} / {c.code} · {c.tag.toUpperCase()}
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-orange-400">
          <Dot /> {recLabel}
        </div>
        <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/70 mix-blend-difference">
          {c.coords}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Mono className="text-orange-400/80">{c.code}</Mono>
        <span className="h-px flex-1 bg-fg/10" />
        <Mono>{c.tag}</Mono>
      </div>

      <h3
        className={
          "mt-4 font-display font-light leading-[1.15] tracking-[-0.01em] " +
          (large ? "text-2xl" : "text-xl")
        }
      >
        <BracketTitle>{c.title}</BracketTitle>
      </h3>
      <p className="mt-4 text-pretty text-sm leading-loose text-muted">{c.body}</p>

      <div className="mt-6 flex items-end justify-between border-t border-fg/10 pt-5">
        <div>
          <div
            className={
              "font-mono font-light leading-none text-fg " +
              (large ? "text-3xl" : "text-2xl")
            }
          >
            {c.stat_value}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40">
            {c.stat_label}
          </div>
        </div>
        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40 group-hover:text-orange-500">
          {openLabel} →
        </span>
      </div>
    </article>
  );
}
