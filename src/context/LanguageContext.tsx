import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Lang, type TranslationKey } from "../i18n";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
  /** translate a key, falling back to English then the key itself */
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "itp.lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = (typeof window !== "undefined" &&
      (window.localStorage.getItem(STORAGE_KEY) as Lang | null)) || null;
    return stored === "hi" || stored === "en" ? stored : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const t = useCallback(
    (key: TranslationKey) => {
      return translations[lang][key] ?? translations.en[key] ?? key;
    },
    [lang]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      toggleLang: () => setLangState((l) => (l === "en" ? "hi" : "en")),
      setLang: setLangState,
      t,
    }),
    [lang, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
