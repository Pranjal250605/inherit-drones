import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/* ============================================================
   EXPERIENCE PROVIDER  (design-variant axis)
   ------------------------------------------------------------
   Orthogonal to Theme (color scheme) and Lang (i18n). Selects
   which *composition* of the site renders:

     "standard" — the default Fujitaka-style vertical scroll
                  (Header → Hero → … → Footer in App.tsx)
     "tactical" — the Anduril-inspired cinematic dark variant
                  with the scroll-driven drone navigator
                  (src/components/tactical/TacticalApp.tsx)

   Both variants read the SAME i18n dictionary, so copy stays in
   one place. Persisted to localStorage; mirrors onto <html> as
   data-experience so CSS can scope variant-only styling.
============================================================ */

export type Experience = "standard" | "tactical";

const STORAGE_KEY = "inherit.experience";
const EXPERIENCES: Experience[] = ["standard", "tactical"];

type ExperienceContextValue = {
  experience: Experience;
  setExperience: (experience: Experience) => void;
  toggle: () => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

function isExperience(value: unknown): value is Experience {
  return (
    typeof value === "string" && (EXPERIENCES as string[]).includes(value)
  );
}

function detectInitialExperience(): Experience {
  if (typeof window === "undefined") return "standard";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isExperience(stored)) return stored;
  } catch {
    // localStorage may be unavailable
  }
  return "standard";
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [experience, setExperienceState] = useState<Experience>(() =>
    detectInitialExperience()
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-experience", experience);
    try {
      window.localStorage.setItem(STORAGE_KEY, experience);
    } catch {
      // ignore
    }
  }, [experience]);

  const value: ExperienceContextValue = {
    experience,
    setExperience: setExperienceState,
    toggle: () =>
      setExperienceState((e) =>
        e === "standard" ? "tactical" : "standard"
      ),
  };

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience(): ExperienceContextValue {
  const ctx = useContext(ExperienceContext);
  if (!ctx)
    throw new Error("useExperience must be used within <ExperienceProvider>");
  return ctx;
}
