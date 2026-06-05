import { useEffect, useState } from "react";
import { useT, type Lang } from "../../i18n";
import { ArrowRight } from "../primitives";
import logo from "../../assets/logo.png";

export function Header() {
  const { t, lang, setLang } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Close the menu when crossing back to the desktop breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setMobileOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const nav: Array<{ label: string; href: string }> = [
    { label: t.header.nav.solutions, href: "#solutions" },
    { label: t.header.nav.operations, href: "#process" },
    { label: t.header.nav.technology, href: "#technology" },
    { label: t.header.nav.field, href: "#field" },
    { label: t.header.nav.contact, href: "#contact" },
  ];

  return (
    <>
      <header
        className={
          "fixed inset-x-0 top-0 z-[60] transition-colors duration-300 " +
          (scrolled || mobileOpen
            ? "backdrop-blur-xl bg-bg/80 border-b border-fg/10 text-fg shadow-sm"
            : "border-b border-transparent bg-transparent text-fg")
        }
      >
        <div className="relative z-50 mx-auto flex h-16 max-w-[87.5rem] items-center justify-between px-6 lg:h-20 lg:px-12">
        <a href="#top" className="flex items-center gap-2.5 whitespace-nowrap">
          <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/5">
            <img src={logo} alt="" className="h-full w-full object-contain p-[3px]" />
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
              className="text-[14.5px] font-semibold tracking-[0.02em] opacity-95 transition hover:text-orange-500 hover:opacity-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-orange-500 px-5 py-2.5 text-[13px] font-bold tracking-[0.03em] text-white transition hover:bg-orange-400"
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
      </header>

      {/* Full-screen mobile menu — rendered as a viewport-level sibling (NOT
          inside <header>, whose backdrop-filter would otherwise clip this fixed
          overlay to the 64px header box). Header bar stays z-50 above it so the
          logo and close button remain tappable. */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={
          "fixed inset-0 z-[55] bg-bg transition-opacity duration-300 md:hidden " +
          (mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0")
        }
      >
        <div className="flex h-[100dvh] flex-col px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-24">
          <nav className="flex flex-col">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{ transitionDelay: mobileOpen ? `${90 + i * 55}ms` : "0ms" }}
                className={
                  "group flex items-center justify-between border-b border-fg/10 py-5 font-display text-[2rem] font-bold leading-none tracking-[-0.02em] transition-all duration-500 ease-out " +
                  (mobileOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0")
                }
              >
                <span className="transition-colors group-hover:text-orange-500 group-active:text-orange-500">
                  {item.label}
                </span>
                <ArrowRight className="h-5 w-5 -rotate-45 text-fg/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-500" />
              </a>
            ))}
          </nav>

          <div
            style={{ transitionDelay: mobileOpen ? "360ms" : "0ms" }}
            className={
              "mt-auto flex items-center justify-between gap-4 transition-all duration-500 ease-out " +
              (mobileOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")
            }
          >
            <div className="inline-flex items-center rounded-full border border-fg/15 p-1 text-[13px] font-bold">
              {(["ja", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={
                    "rounded-full px-4 py-1.5 uppercase tracking-[0.1em] transition " +
                    (lang === l ? "bg-orange-500 text-white" : "text-fg/55")
                  }
                >
                  {l}
                </button>
              ))}
            </div>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-[14px] font-bold tracking-[0.02em] text-white transition hover:bg-orange-400"
            >
              {t.header.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
