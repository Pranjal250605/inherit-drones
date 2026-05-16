import { SectionFrame, Tag } from "../primitives";
import { useT } from "../../i18n";

export function Testimonial() {
  const { t } = useT();

  return (
    <SectionFrame id="voice" className="bg-bg py-24 md:py-32">
      <div className="mx-auto grid max-w-[1100px] grid-cols-12 gap-8 px-6 lg:px-10">
        <div className="col-span-12 md:col-span-3">
          <Tag>{t.testimonial.tag}</Tag>
          <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/30">
            {t.testimonial.transmission_label}
            <br />
            {t.testimonial.transmission_date}
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="font-mono text-2xl leading-none text-orange-400/80">[</div>
          <blockquote className="mt-4 max-w-3xl text-balance font-display text-xl font-light leading-[1.45] tracking-[-0.005em] text-fg/90 md:text-2xl">
            {t.testimonial.quote}
          </blockquote>
          <div className="mt-4 text-right font-mono text-2xl leading-none text-orange-400/80">
            ]
          </div>

          <div className="mt-8 flex items-center gap-4 border-t border-fg/10 pt-6">
            <div className="h-10 w-10 border border-fg/15 bg-gradient-to-br from-fg/10 to-transparent" />
            <div>
              <div className="text-sm text-fg/85">{t.testimonial.author_name}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40">
                {t.testimonial.author_role}
              </div>
            </div>
            <div className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.22em] text-fg/30 md:block">
              {t.testimonial.signed}
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
