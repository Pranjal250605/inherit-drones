import { useEffect, useState } from "react";
import { ArrowRight, Dot } from "../primitives";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { useT } from "../../i18n";

export function Header() {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      const d = new Date();
      const z = (n: number) => String(n).padStart(2, "0");
      setTime(
        `${z(d.getUTCHours())}:${z(d.getUTCMinutes())}:${z(d.getUTCSeconds())} UTC`
      );
    };
    tick();
    const t = window.setInterval(tick, 1000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(t);
    };
  }, []);

  const nav: Array<{ label: string; href: string; active?: boolean }> = [
    { label: t.header.nav.home, href: "#top", active: true },
    { label: t.header.nav.technology, href: "#technology" },
    { label: t.header.nav.solutions, href: "#solutions" },
    { label: t.header.nav.operations, href: "#process" },
    { label: t.header.nav.field, href: "#field" },
    { label: t.header.nav.contact, href: "#contact" },
  ];

  return (
    <header
      data-theme="dark"
      className={
        "fixed inset-x-0 top-0 z-50 text-fg transition-all duration-500 " +
        (scrolled
          ? "border-b border-fg/5 bg-bg/80 backdrop-blur-xl"
          : "bg-transparent")
      }
    >
      <div className="hidden border-b border-fg/5 md:block">
        <div className="mx-auto flex h-7 max-w-[1500px] items-center justify-between px-6 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40 lg:px-10">
          <span className="flex items-center gap-2">
            <Dot /> {t.header.status}
          </span>
          <div className="flex items-center gap-4">
            <ThemeSwitcher variant="compact" />
            <LanguageSwitcher variant="compact" />
            <span aria-live="off" className="ml-2">{time}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-6 lg:h-16 lg:px-10">
        <a href="#top" className="flex items-center gap-3 whitespace-nowrap">
          <span className="relative grid h-7 w-7 place-items-center border border-fg/20 bg-fg/[0.04]">
            <span className="absolute inset-1 border border-orange-500/70" />
            <span className="absolute h-1 w-1 bg-orange-500" />
          </span>
          <span className="flex items-baseline gap-2">
            <span className="text-[14px] font-medium tracking-[0.02em] text-fg">
              INHERIT
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40">
              / CO.
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={
                "font-mono text-[10.5px] uppercase tracking-[0.22em] transition " +
                (item.active ? "text-fg" : "text-fg/45 hover:text-fg")
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex group relative items-center gap-3 whitespace-nowrap bg-orange-500 px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bg transition hover:bg-orange-400 cut-corner-sm"
        >
          {t.header.cta}
          <ArrowRight className="h-3 w-3" />
        </a>

        <button
          type="button"
          aria-label={mobileOpen ? t.header.menu_close : t.header.menu_open}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center border border-fg/15 bg-fg/[0.04] md:hidden"
        >
          <span className="sr-only">{t.header.menu_toggle}</span>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="square" />
            ) : (
              <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="square" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-fg/10 bg-bg/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-[1500px] flex-col gap-1 px-6 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-fg/5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg/70 hover:text-orange-400"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-3 bg-orange-500 px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bg cut-corner-sm"
              >
                {t.header.cta} <ArrowRight className="h-3 w-3" />
              </a>
              <div className="flex items-center gap-2">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
