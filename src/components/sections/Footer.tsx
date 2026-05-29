import { LanguageSwitcher } from "../LanguageSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { useT } from "../../i18n";

export function Footer() {
  const { t } = useT();

  return (
    <footer className="relative bg-[#161513] pt-24 text-white md:pt-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-y-12 gap-x-8 border-t border-white/10 pt-16 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-orange-500">
                <span className="h-2 w-2 rounded-[2px] bg-white" />
              </span>
              <span className="font-display text-lg font-bold tracking-[0.02em] text-white">
                INHERIT / CO.
              </span>
            </div>
            <p className="mt-5 max-w-xs text-pretty text-[15px] leading-relaxed text-white/55">
              {t.footer.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div>
                <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                  Theme
                </div>
                <ThemeSwitcher />
              </div>
              <div>
                <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                  Language
                </div>
                <LanguageSwitcher />
              </div>
            </div>
          </div>

          {t.footer.cols.map((c) => (
            <div key={c.h}>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-400">
                {c.h}
              </div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[15px] text-white/65 transition hover:text-orange-400"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-white/10 pt-16">
          <div className="flex items-baseline gap-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-400">
              {t.footer.sns.h}
            </h3>
            <span className="font-jp text-[12px] tracking-[0.08em] text-white/40">
              {t.footer.sns.tag_jp}
            </span>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {t.footer.sns.brands.map((brand) => (
              <div key={brand.name}>
                <div className="text-[15px] font-bold tracking-[0.01em] text-white">
                  {brand.name}
                </div>
                <div className="mt-1 text-[12px] uppercase tracking-[0.2em] text-white/40">
                  {brand.subtitle}
                </div>
                <ul className="mt-5 space-y-3">
                  {brand.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-[15px] text-white/65 transition hover:text-orange-400"
                      >
                        {l.label}
                        <span className="text-white/30 transition group-hover:translate-x-1 group-hover:text-orange-400">
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 py-8 md:flex-row md:items-center">
          <div className="text-[12px] tracking-[0.02em] text-white/45">
            © {new Date().getFullYear()} {t.footer.copyright_suffix}
          </div>
          <div className="flex items-center gap-6 text-[12px] text-white/45">
            {t.footer.legal.map((label) => (
              <a key={label} href="#" className="transition hover:text-white">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
