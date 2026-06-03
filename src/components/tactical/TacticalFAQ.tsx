import { useState } from "react";
import { useT } from "../../i18n";
import { SectionHead, TSection } from "./primitives";

/* TacticalFAQ (#faq) — heading left, quiet accordion right. */
export function TacticalFAQ() {
  const { t } = useT();
  const fq = t.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <TSection id="faq">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        <SectionHead
          eyebrow={fq.tag}
          jp={fq.subtitle_jp}
          lead={fq.lead}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <span className="block">{fq.h2_line1}</span>
          <span className="block">{fq.h2_line2}</span>
          <span className="block text-orange-500">{fq.h2_emph}</span>
        </SectionHead>

        <div data-tac="stagger">
          {fq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} data-tac-item className="border-b border-white/10">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-6 py-6 text-left"
                >
                  <span
                    className={
                      "flex-1 text-[17px] font-medium leading-snug transition " +
                      (isOpen ? "text-orange-500" : "text-white")
                    }
                  >
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={
                      "shrink-0 text-[20px] font-light leading-none text-white/40 transition-transform duration-300 " +
                      (isOpen ? "rotate-45" : "rotate-0")
                    }
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 pr-10">
                    <p className="text-[15px] leading-relaxed text-white/55">
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
