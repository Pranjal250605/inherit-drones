import { useState } from "react";
import { Mono, Plus, SectionFrame, Tag } from "../primitives";
import { useT } from "../../i18n";

export function FAQ() {
  const { t } = useT();
  const [open, setOpen] = useState<number>(0);

  return (
    <SectionFrame id="faq" className="bg-bg-alt py-24 md:py-32">
      <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-10 px-6 lg:px-10">
        <div className="col-span-12 md:col-span-4">
          <Tag>{t.faq.tag}</Tag>
          <h2
            data-anim="title-up"
            className="mt-8 font-display text-3xl font-light leading-[1.1] tracking-[-0.015em] md:text-4xl"
          >
            {t.faq.h2_line1}
            <br />
            {t.faq.h2_line2 && (
              <>
                {t.faq.h2_line2}
                <br />
              </>
            )}
            <span className="italic text-orange-400">{t.faq.h2_emph}</span>
          </h2>
          <div className="mt-5 font-jp text-[11px] tracking-[0.05em] text-fg/30">
            {t.faq.subtitle_jp}
          </div>
          <p className="mt-8 max-w-sm text-pretty text-sm leading-loose text-muted">
            {t.faq.lead}
          </p>
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="border-t border-fg/10">
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
                  className="block w-full border-b border-fg/10 py-7 text-left"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-6">
                      <Mono className="mt-1 text-orange-400/80">
                        08.{String(i + 1).padStart(2, "0")}
                      </Mono>
                      <span className="font-display text-base font-light leading-[1.4] tracking-[-0.005em] md:text-lg">
                        <span
                          className={
                            "mr-2 inline-block font-mono text-orange-400 transition " +
                            (isOpen ? "opacity-100" : "opacity-0")
                          }
                        >
                          [
                        </span>
                        {it.q}
                        <span
                          className={
                            "ml-2 inline-block font-mono text-orange-400 transition " +
                            (isOpen ? "opacity-100" : "opacity-0")
                          }
                        >
                          ]
                        </span>
                      </span>
                    </div>
                    <span
                      className={
                        "mt-1 grid h-7 w-7 shrink-0 place-items-center border border-fg/20 transition " +
                        (isOpen
                          ? "rotate-45 border-orange-500 bg-orange-500 text-bg"
                          : "text-fg/60")
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
                      <p className="mt-4 max-w-2xl pl-[3.5rem] text-pretty text-sm leading-relaxed text-muted">
                        {it.a}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
