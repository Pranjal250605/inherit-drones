import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

/* Floating bottom-right control. Minimized to a single button; expands to a
   small popover with the theme + language switchers (moved out of the nav). */
export function SettingsDock() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      <div
        role="dialog"
        aria-label="Display settings"
        aria-hidden={!open}
        className={
          "w-[210px] origin-bottom-right rounded-2xl border border-fg/10 bg-bg p-5 text-fg shadow-2xl shadow-black/15 transition-all duration-300 " +
          (open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible translate-y-2 scale-95 opacity-0")
        }
      >
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-fg/45">
          Theme
        </div>
        <div className="mt-2.5">
          <ThemeSwitcher />
        </div>
        <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-fg/45">
          Language
        </div>
        <div className="mt-2.5">
          <LanguageSwitcher />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Display settings"
        title="Display settings"
        className="grid h-12 w-12 place-items-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-400"
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M4 8h9M19 8h1M4 16h1M11 16h9" />
            <circle cx="16" cy="8" r="2.4" />
            <circle cx="8" cy="16" r="2.4" />
          </svg>
        )}
      </button>
    </div>
  );
}
