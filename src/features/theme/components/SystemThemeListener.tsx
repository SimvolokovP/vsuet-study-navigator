"use client";

import { useEffect } from "react";
import { useThemeStore } from "../store/use-theme-store";

export function SystemThemeListener() {
  const { setTheme, getSystemTheme } = useThemeStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light", false);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setTheme, getSystemTheme]);

  return null;
}