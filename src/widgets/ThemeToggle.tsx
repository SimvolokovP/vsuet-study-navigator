"use client";

import { Toggler } from "@/components/ui/toggler";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const viewModeItems = [
  { label: <Sun />, value: "light" },
  { label: <Moon />, value: "dark" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Toggler
      toggleList={viewModeItems}
      activeToggleItem={theme || "light"}
      onToggleChange={(v: string) => setTheme(v)}
    />
  );
}
