import { useEffect, useState } from "react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { useT } from "../../i18n";

export function Header() {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav: Array<{ label: string; href: string }> = [
    { label: t.header.nav.technology, href: "#technology" },
    { label: t.header.nav.solutions, href: "#solutions" },
    { label: t.header.nav.operations, href: "#process" },
    { label: t.header.nav.field, href: "#field" },
    { label: t.header.nav.contact, href: "#contact" },
  ];

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 " +
        (scrolled || mobileOpen
          ? "border-b border-fg/10 bg-bg/85 text-fg backdrop-blur-xl"
          : "border-b border-transparent bg-transparent text-white")
      }
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:h-20 lg:px-12">
        <a href="#top" className="flex items-center gap-2.5 whitespace-nowrap">
          <span className="relative grid h-7 w-7 place-items-center rounded-md bg-orange-500">
            <span className="h-2 w-2 rounded-[2px] bg-white" />
          </span>
          <span className="text-[16px] font-bold tracking-[0.02em]">
            INHERIT
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-semibold tracking-[0.02em] opacity-75 transition hover:text-orange-500 hover:opacity-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher variant="compact" />
          <ThemeSwitcher variant="compact" />
          <a
            href="#contact"
            className="ml-1 inline-flex items-center rounded-full bg-orange-500 px-5 py-2 text-[12px] font-bold tracking-[0.03em] text-white transition hover:bg-orange-400"
          >
            {t.header.cta}
          </a>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? t.header.menu_close : t.header.menu_open}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center md:hidden"
        >
          <span className="sr-only">{t.header.menu_toggle}</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-fg/10 bg-bg text-fg md:hidden">
          <nav className="mx-auto flex max-w-[1400px] flex-col px-6 py-2">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-fg/10 py-4 text-sm font-medium tracking-[0.04em] text-fg/80 transition hover:text-orange-500"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pb-2">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center rounded-full bg-orange-500 px-5 py-2 text-[12px] font-bold tracking-[0.03em] text-white"
              >
                {t.header.cta}
              </a>
              <div className="flex items-center gap-3 text-fg">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
