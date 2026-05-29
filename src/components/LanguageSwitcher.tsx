import { useT, type Lang } from "../i18n";

type Props = {
  className?: string;
  variant?: "default" | "compact";
};

const LANGS: Array<{ code: Lang; key: "label_en" | "label_ja" }> = [
  { code: "en", key: "label_en" },
  { code: "ja", key: "label_ja" },
];

export function LanguageSwitcher({ className = "", variant = "default" }: Props) {
  const { lang, setLang, t } = useT();
  const sizeClasses =
    variant === "compact"
      ? "px-2 py-0.5 text-[9px]"
      : "px-3 py-1 text-[10px]";
  return (
    <div
      role="group"
      aria-label="Language"
      className={"inline-flex items-center gap-1 " + className}
    >
      {LANGS.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            aria-label={l.code === "ja" ? "日本語" : "English"}
            className={
              "border font-mono uppercase tracking-[0.2em] transition " +
              sizeClasses +
              " " +
              (active
                ? "border-orange-500 text-orange-500"
                : "border-current text-current opacity-50 hover:opacity-90")
            }
          >
            {t[l.key]}
          </button>
        );
      })}
    </div>
  );
}
