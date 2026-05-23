import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  isMounted: boolean;
  hasUserSetTheme: boolean;
  setMounted: (mounted: boolean) => void;
  setTheme: (theme: Theme, userSet?: boolean) => void;
  toggleTheme: () => void;
  getSystemTheme: () => Theme;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "light",
      isMounted: false,
      hasUserSetTheme: false, 

      setMounted: (mounted: boolean) => set({ isMounted: mounted }),

      setTheme: (theme: Theme, userSet: boolean = false) => {
        set({ theme, hasUserSetTheme: userSet });
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.style.colorScheme = theme;
      },

      toggleTheme: () => {
        const newTheme = get().theme === "light" ? "dark" : "light";
        get().setTheme(newTheme, true);
      },

      getSystemTheme: () => {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      },

      initializeTheme: () => {
        const saved = localStorage.getItem("vsuet_schedule_theme");
        
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed.state?.theme) {
              get().setTheme(parsed.state.theme, parsed.state.hasUserSetTheme || false);
              return;
            }
          } catch (error) {
            console.warn("Ошибка парсинга темы:", error);
          }
        }
        
        const systemTheme = get().getSystemTheme();
        get().setTheme(systemTheme, false); 
      },
    }),
    {
      name: "vsuet_schedule_theme",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setMounted(true);
        }
      },
    }
  )
);