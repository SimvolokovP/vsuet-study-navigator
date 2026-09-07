"use client";

import { Skeleton } from "@/shared/components/ui/skeleton";
import { Toggler } from "@/shared/components/ui/toggler";
import { useThemeStore } from "@/features/theme/store/use-theme-store";
import { Moon, Sun } from "lucide-react";

const viewModeItems = [
  { label: <Sun />, value: "light" },
  { label: <Moon />, value: "dark" },
];

export function ThemeToggle() {
  const { theme, toggleTheme, isMounted } = useThemeStore();

  return (
    <>
      {isMounted ? (
        <Toggler
          disabled={!isMounted}
          toggleList={viewModeItems}
          activeToggleItem={theme || "light"}
          onToggleChange={() => toggleTheme()}
        />
      ) : (
        <Skeleton className="h-9 w-[104px]" />
      )}
    </>
  );
}
