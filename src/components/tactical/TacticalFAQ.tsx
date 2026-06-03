import { useState } from "react";
import { useT } from "../../i18n";
import { Mono, Eyebrow, TSection } from "./primitives";

/* TacticalFAQ (S.08) — two-column: sticky heading left, accordion right. */
export function TacticalFAQ() {
  const { t } = useT();
  const fq = t.faq;

  const [open, setOpen] = useState<number | null>(0);

  return (
    <TSection id="faq" index="08">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

        {/* LEFT — sticky-ish header column */}
        <div data-tac="up" className="lg:sticky lg:top-24 lg:self-start">
          <Eyebrow>{fq.tag}</Eyebrow>

          <h2 className="mt-8 font-display text-4xl font-bold uppercase leading-[1.0] tracking-[-0.02em] text-white md:text-6xl">
            <span className="block">{fq.h2_line1}</span>
            <span className="block">{fq.h2_line2}</span>
            <span className="block text-orange-500">{fq.h2_emph}</span>
          </h2>

          <div className="mt-5 font-jp text-[12px] tracking-[0.24em] text-white/45">
            {fq.subtitle_jp}
          </div>

          <p className="mt-8 max-w-sm text-pretty text-[15px] leading-relaxed text-white/55">
            {fq.lead}
          </p>
        </div>

        {/* RIGHT — accordion */}
        <div data-tac="stagger">
          {fq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                data-tac-item
                className="border-b border-white/10"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start gap-5 py-5 text-left transition"
                >
                  {/* index */}
                  <Mono className="mt-0.5 shrink-0 text-white/35">
                    0{i + 1}
                  </Mono>

                  {/* question text */}
                  <span
                    className={
                      "flex-1 text-[15px] font-medium leading-snug transition " +
                      (isOpen ? "text-orange-500" : "text-white")
                    }
                  >
                    {item.q}
                  </span>

                  {/* +/− indicator */}
                  <span
                    aria-hidden="true"
                    className={
                      "mt-0.5 shrink-0 font-mono text-[18px] leading-none text-white/40 transition-transform duration-300 " +
                      (isOpen ? "rotate-45" : "rotate-0")
                    }
                  >
                    +
                  </span>
                </button>

                {/* answer */}
                {isOpen && (
                  <div className="pb-5 pl-10 pr-4">
                    <p className="text-[14px] leading-relaxed text-white/55">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </TSection>
  );
}
