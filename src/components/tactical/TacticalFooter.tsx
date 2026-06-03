import { useT } from "../../i18n";
import { Mono } from "./primitives";

/* TacticalFooter — instrumentation status bar + link grid + oversized wordmark. */
export function TacticalFooter() {
  const { t } = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 px-6 pt-16 pb-10 lg:px-16">
      {/* status strip */}
      <div className="mx-auto flex w-full max-w-[1320px] flex-wrap items-center gap-x-8 gap-y-2 border-b border-white/10 pb-6">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 blink" />
          {t.footer.status}
        </span>
        <Mono>{t.footer.uptime}</Mono>
        <Mono className="ml-auto">{t.footer.doc}</Mono>
      </div>

      {/* link grid */}
      <div className="mx-auto mt-12 grid w-full max-w-[1320px] grid-cols-2 gap-8 md:grid-cols-4">
        {t.footer.cols.map((col) => (
          <div key={col.h}>
            <div className="font-mono text-[11px] uppercase tracking-[0.26em] text-orange-400">
              {col.h}
            </div>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#contact"
                    className="text-[13px] text-white/55 transition hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* oversized wordmark */}
      <div className="mx-auto mt-16 w-full max-w-[1320px]">
        <div className="select-none font-display text-[18vw] font-bold uppercase leading-none tracking-[-0.03em] text-white/[0.06] lg:text-[12rem]">
          Inherit
        </div>
        <p className="mt-4 max-w-xl text-[12px] leading-relaxed text-white/40">
          {t.footer.description}
        </p>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-[1320px] flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
          © {year} {t.footer.copyright_suffix}
        </span>
        <div className="ml-auto flex items-center gap-5">
          {t.footer.legal.map((l) => (
            <a
              key={l}
              href="#"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 transition hover:text-orange-400"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
