import { useT } from "../../i18n";
import { Mono, Eyebrow, TSection, GhostButton } from "./primitives";

/* TacticalProcess (#process) — four-phase operational flow rendered as
   a stepped timeline: numbered orange nodes connected by a thin rule,
   each node expanding into a jp kicker, title, and body. */
export function TacticalProcess() {
  const { t } = useT();

  return (
    <TSection id="process" index="S.03">
      {/* Eyebrow */}
      <Eyebrow className="mb-12">{t.process.tag}</Eyebrow>

      {/* Headline block */}
      <div data-tac="up" className="max-w-4xl">
        <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white md:text-5xl lg:text-6xl">
          <span className="block">{t.process.h2_line1}</span>
          <span className="block">
            <span className="text-orange-500">{t.process.h2_emph}</span>
          </span>
          <span className="block text-white/80">{t.process.h2_line2}</span>
        </h2>

        <div className="mt-6 flex items-center gap-4">
          <span className="h-px w-8 bg-orange-500/60" />
          <span className="font-jp text-[13px] tracking-[0.22em] text-white/45">
            {t.process.subtitle_jp}
          </span>
        </div>
      </div>

      {/* Timeline steps */}
      <div
        data-tac="stagger"
        className="mt-20 grid gap-0 sm:grid-cols-2 lg:grid-cols-4"
      >
        {t.process.steps.map((step, i) => (
          <div
            key={step.n}
            data-tac-item
            className="group relative flex flex-col gap-5 border-t border-white/10 pt-8 pr-8"
          >
            {/* Orange connecting rule (hidden on last item) */}
            {i < t.process.steps.length - 1 && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 hidden h-px bg-orange-500/40 lg:block"
                style={{ width: "calc(100% - 2.5rem)", left: "2.5rem" }}
              />
            )}

            {/* Node row: numbered circle + mono code */}
            <div className="flex items-center gap-3">
              {/* Numbered node */}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-orange-500/50 bg-orange-500/10 font-mono text-[11px] font-bold tracking-[0.08em] text-orange-400 transition group-hover:border-orange-400 group-hover:bg-orange-500/20">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Mono>{step.n}</Mono>
            </div>

            {/* jp kicker */}
            <span className="font-jp text-[11px] tracking-[0.22em] text-white/35">
              {step.jp}
            </span>

            {/* Title */}
            <h3 className="font-display text-xl font-bold uppercase tracking-[-0.01em] text-white md:text-2xl">
              {step.title}
            </h3>

            {/* Body */}
            <p className="text-pretty text-[14px] leading-relaxed text-white/55">
              {step.body}
            </p>
          </div>
        ))}
      </div>

      {/* CTA footer */}
      <div data-tac="up" className="mt-20 flex items-center gap-6 border-t border-white/10 pt-10">
        <GhostButton href="#contact">{t.process.cta}</GhostButton>
        <Mono className="hidden sm:inline">BRIEF · OPS · DELIVER</Mono>
      </div>
    </TSection>
  );
}
