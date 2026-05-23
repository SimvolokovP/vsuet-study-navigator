"use client";

import { Toggler } from "@/components/ui/toggler";
import { useThemeStore } from "@/features/theme/store/use-theme-store";
import { Moon, Sun } from "lucide-react";

const viewModeItems = [
  { label: <Sun />, value: "light" },
  { label: <Moon />, value: "dark" },
];

export function ThemeToggle() {
  const { theme, toggleTheme, isMounted } = useThemeStore();

  return (
    <Toggler
      disabled={!isMounted}
      toggleList={viewModeItems}
      activeToggleItem={theme || "light"}
      onToggleChange={() => toggleTheme()}
    />
  );
}
