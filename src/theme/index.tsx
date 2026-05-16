import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/* ============================================================
   THEME PROVIDER
   - Adds [data-theme] to <html>, which the CSS vars in
     src/index.css listen for.
   - Persists choice to localStorage and falls back to the OS
     preference (`prefers-color-scheme`).
   - To add a 3rd theme: extend `Theme`, add a CSS block in
     index.css, and add an entry in ThemeSwitcher's THEMES list.
============================================================ */

export type Theme = "dark" | "light" | "blueprint";

const STORAGE_KEY = "inherit.theme";
const THEMES: Theme[] = ["dark", "light", "blueprint"];

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as string[]).includes(value);
}

function detectInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    // localStorage may be unavailable
  }
  const prefersLight = window.matchMedia?.(
    "(prefers-color-scheme: light)"
  ).matches;
  return prefersLight ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => detectInitialTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const value: ThemeContextValue = {
    theme,
    setTheme: setThemeState,
    toggle: () =>
      setThemeState((t) => {
        const idx = THEMES.indexOf(t);
        return THEMES[(idx + 1) % THEMES.length] ?? "dark";
      }),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
