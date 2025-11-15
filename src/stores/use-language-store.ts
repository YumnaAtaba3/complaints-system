import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageState {
  language: "en" | "ar";
  toggleLanguage: () => void;
  setLanguage: (lang: "en" | "ar") => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "en",
      toggleLanguage: () =>
        set((state) => {
          const newLang = state.language === "en" ? "ar" : "en";
          document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
          document.documentElement.lang = newLang;
          return { language: newLang };
        }),
      setLanguage: (language) => {
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = language;
        set({ language });
      },
    }),
    {
      name: "language-storage",
    }
  )
);
