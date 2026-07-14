"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ThemeContextValue = { isDark: boolean };

const ThemeContext = createContext<ThemeContextValue>({ isDark: false });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    update();
    return () => observer.disconnect();
  }, []);

  return <ThemeContext.Provider value={{ isDark }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
