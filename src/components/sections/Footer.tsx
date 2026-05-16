import { Dot, Mono } from "../primitives";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { useT } from "../../i18n";

export function Footer() {
  const { t } = useT();

  return (
    <footer className="relative bg-bg pt-16">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="flex items-center justify-between border-t border-fg/10 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Dot /> {t.footer.status}
            </span>
            <span className="hidden md:inline">{t.footer.uptime}</span>
          </div>
          <div className="hidden md:block">{t.footer.doc}</div>
        </div>

        <div className="border-t border-fg/10 pb-10 pt-10">
          <div
            data-anim="wordmark"
            className="font-display text-6xl font-light leading-none tracking-[-0.03em] text-fg/[0.08] md:text-7xl lg:text-8xl whitespace-nowrap"
          >
            INHERIT&nbsp;/&nbsp;CO.
          </div>
          <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/30">
            {t.footer.wordmark_sub}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-fg/10 pt-12 md:grid-cols-6">
          <div className="col-span-2">
            <div className="flex items-center gap-3">
              <span className="relative grid h-7 w-7 place-items-center border border-fg/20 bg-fg/[0.04]">
                <span className="absolute inset-1 border border-orange-400/70" />
                <span className="absolute h-1 w-1 bg-orange-500" />
              </span>
              <span className="text-sm font-medium tracking-[0.02em]">
                INHERIT / CO.
              </span>
            </div>
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-muted">
              {t.footer.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div>
                <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-fg/40">
                  Theme
                </div>
                <ThemeSwitcher />
              </div>
              <div>
                <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-fg/40">
                  Language
                </div>
                <LanguageSwitcher />
              </div>
            </div>
          </div>

          {t.footer.cols.map((c) => (
            <div key={c.h}>
              <Mono>{c.h}</Mono>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-fg/70 transition hover:text-orange-400"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-fg/10 pt-12">
          <div className="flex items-baseline justify-between">
            <div className="flex items-center gap-3">
              <Mono>{t.footer.sns.h}</Mono>
              <span className="font-jp text-[10.5px] tracking-[0.08em] text-fg/35">
                {t.footer.sns.tag_jp}
              </span>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-fg/30 md:inline">
              {t.footer.sns.brands.length.toString().padStart(2, "0")} / CHANNELS
            </span>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-px bg-fg/10 sm:grid-cols-2">
            {t.footer.sns.brands.map((brand) => (
              <div key={brand.name} className="relative bg-bg p-5">
                <div className="flex items-center gap-2">
                  <Dot />
                  <span className="text-sm font-medium tracking-[0.02em]">
                    {brand.name}
                  </span>
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/35">
                  {brand.subtitle}
                </div>
                <ul className="mt-5 space-y-2.5">
                  {brand.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 text-sm text-fg/70 transition hover:text-orange-400"
                      >
                        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-fg/40 transition group-hover:text-orange-400/70">
                          →
                        </span>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-fg/10 py-6 md:flex-row md:items-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40">
            © {new Date().getFullYear()} {t.footer.copyright_suffix}
          </div>
          <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40">
            {t.footer.legal.map((label) => (
              <a key={label} href="#" className="hover:text-fg">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
