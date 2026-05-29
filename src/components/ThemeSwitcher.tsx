import { useTheme, type Theme } from "../theme";

type Props = {
  className?: string;
  variant?: "default" | "compact";
};

const THEMES: Array<{ code: Theme; label: string; title: string }> = [
  { code: "dark", label: "DRK", title: "Dark theme" },
  { code: "light", label: "LIT", title: "Light theme" },
  { code: "blueprint", label: "BLU", title: "Blueprint theme" },
];

export function ThemeSwitcher({ className = "", variant = "default" }: Props) {
  const { theme, setTheme } = useTheme();
  const sizeClasses =
    variant === "compact"
      ? "px-2 py-0.5 text-[9px]"
      : "px-3 py-1 text-[10px]";
  return (
    <div
      role="group"
      aria-label="Theme"
      className={"inline-flex items-center gap-1 " + className}
    >
      {THEMES.map((t) => {
        const active = theme === t.code;
        return (
          <button
            key={t.code}
            type="button"
            onClick={() => setTheme(t.code)}
            aria-pressed={active}
            aria-label={t.title}
            title={t.title}
            className={
              "border font-mono uppercase tracking-[0.2em] transition " +
              sizeClasses +
              " " +
              (active
                ? "border-orange-500 text-orange-500"
                : "border-current text-current opacity-50 hover:opacity-90")
            }
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
