import { useExperience, type Experience } from "../experience";

type Props = {
  className?: string;
};

const OPTIONS: Array<{ code: Experience; label: string; title: string }> = [
  { code: "standard", label: "STD", title: "Standard site" },
  { code: "tactical", label: "TAC", title: "Tactical flight variant" },
];

/* Toggle for the design-variant axis, shown in the SettingsDock alongside
   the theme + language switchers. Same visual language as ThemeSwitcher. */
export function ExperienceSwitcher({ className = "" }: Props) {
  const { experience, setExperience } = useExperience();
  return (
    <div
      role="group"
      aria-label="Experience"
      className={"inline-flex items-center gap-1 " + className}
    >
      {OPTIONS.map((o) => {
        const active = experience === o.code;
        return (
          <button
            key={o.code}
            type="button"
            onClick={() => setExperience(o.code)}
            aria-pressed={active}
            aria-label={o.title}
            title={o.title}
            className={
              "border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition " +
              (active
                ? "border-orange-500 text-orange-500"
                : "border-current text-current opacity-50 hover:opacity-90")
            }
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
