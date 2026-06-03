import { useState } from "react";
import { Plus, SectionFrame, SectionLabel } from "../primitives";
import { useT } from "../../i18n";

export function FAQ() {
  const { t } = useT();
  const [open, setOpen] = useState<number>(0);

  return (
    <SectionFrame id="faq" className="relative overflow-hidden bg-bg-alt py-24 md:py-32">
      {/* oversized drifting index — depth + asymmetry */}
      <span
        aria-hidden="true"
        data-anim="parallax"
        data-speed="0.26"
        className="pointer-events-none absolute -top-12 left-0 select-none font-display text-[10rem] font-bold leading-none text-fg/[0.04] md:text-[15rem]"
      >
        08
      </span>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-12 gap-x-16 gap-y-12 px-6 lg:px-12">
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionLabel>{t.faq.tag}</SectionLabel>
            <h2
              data-anim="title-up"
              className="mt-6 font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-fg md:text-6xl"
            >
              {t.faq.h2_line1} {t.faq.h2_line2} {t.faq.h2_emph}
            </h2>
            <div className="mt-5 font-jp text-[12px] tracking-[0.08em] text-fg/50">
              {t.faq.subtitle_jp}
            </div>
            <p className="mt-8 max-w-sm text-pretty text-[15px] leading-relaxed text-muted">
              {t.faq.lead}
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          {t.faq.items.map((it, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            return (
              <button
                key={i}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="block w-full border-t-2 border-fg/10 py-8 text-left transition-colors hover:border-orange-500"
              >
                <div className="flex items-start justify-between gap-8">
                  <span className="font-display text-xl font-bold leading-[1.3] tracking-[-0.01em] md:text-2xl">
                    {it.q}
                  </span>
                  <span
                    className={
                      "mt-1.5 grid h-7 w-7 shrink-0 place-items-center border transition " +
                      (isOpen
                        ? "rotate-45 border-orange-500 bg-orange-500 text-bg"
                        : "border-fg/20 text-fg/50")
                    }
                  >
                    <Plus className="h-3 w-3" />
                  </span>
                </div>
                <div
                  id={panelId}
                  className="grid overflow-hidden transition-all duration-500"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted">
                      {it.a}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </SectionFrame>
  );
}
