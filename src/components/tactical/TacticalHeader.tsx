import { useEffect, useState } from "react";
import { useT } from "../../i18n";

/* Minimal Anduril-style fixed top bar for the tactical variant: thin, uppercase,
   wide-tracked, transparent over the hero then solid once scrolled. */
export function TacticalHeader() {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
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
        (scrolled
          ? "border-b border-white/10 bg-[#04060a]/90 backdrop-blur"
          : "border-b border-transparent bg-transparent")
      }
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-6 lg:h-20 lg:px-16">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center bg-orange-500">
            <span className="h-2 w-2 bg-black" />
          </span>
          <span className="text-[15px] font-bold uppercase tracking-[0.18em] text-white">
            Inherit
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60 transition hover:text-orange-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/45 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 blink" />
            {t.header.status}
          </span>
          <a
            href="#contact"
            className="inline-flex items-center bg-orange-500 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-black transition hover:bg-orange-400"
          >
            {t.header.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
