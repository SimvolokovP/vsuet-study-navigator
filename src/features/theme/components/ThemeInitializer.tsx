"use client";

import { useEffect } from "react";
import { useThemeStore } from "../store/use-theme-store";

export function ThemeInitializer() {
  const { initializeTheme, setMounted } = useThemeStore();

  useEffect(() => {
    initializeTheme();
    setMounted(true);
  }, [initializeTheme, setMounted]);

  return null;
}