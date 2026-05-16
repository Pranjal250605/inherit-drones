import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import enRaw from "./en.json";
import jaRaw from "./ja.json";

export type Lang = "en" | "ja";
export type Dict = typeof enRaw;

const DICTIONARIES: Record<Lang, Dict> = {
  en: enRaw,
  ja: jaRaw as unknown as Dict,
};

const STORAGE_KEY = "inherit.lang";

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ja") return stored;
  } catch {
    // localStorage may be unavailable (e.g. SSR, private mode)
  }
  const nav = window.navigator?.language?.toLowerCase() ?? "";
  return nav.startsWith("ja") ? "ja" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectInitialLang());

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const value: I18nContextValue = {
    lang,
    setLang: setLangState,
    t: DICTIONARIES[lang],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useT(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useT must be used within <I18nProvider>");
  return ctx;
}
