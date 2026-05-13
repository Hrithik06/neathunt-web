import { createContext, useContext, useState, useEffect } from "react";

type ThemeName = "sunrise" | "midnight";

type ThemeContextValue = {
  themeName: ThemeName;
  isMidnight: boolean;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ✅ Type guard (safety)
const isValidTheme = (value: any): value is ThemeName =>
  value === "sunrise" || value === "midnight";

// ✅ Initial theme logic
const getInitialTheme = (): ThemeName => {
  if (typeof window === "undefined") return "sunrise";

  const saved = localStorage.getItem("theme");
  if (isValidTheme(saved)) return saved;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "midnight" : "sunrise";
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>(getInitialTheme);

  // ✅ Sync with DOM + storage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
  }, [themeName]);

  const toggle = () => {
    setThemeName((prev) => (prev === "sunrise" ? "midnight" : "sunrise"));
  };

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        isMidnight: themeName === "midnight",
        toggle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ Hook
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
