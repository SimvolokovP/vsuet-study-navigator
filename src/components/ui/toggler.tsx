"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/shared/utils/cn";

interface TogglerProps {
  toggleList: { label: React.ReactNode; value: string }[];
  activeToggleItem: string;
  onToggleChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Toggler({
  toggleList,
  activeToggleItem,
  onToggleChange,
  disabled,
  className,
}: TogglerProps) {
  return (
    <TabsPrimitive.Root
      value={activeToggleItem}
      onValueChange={onToggleChange}
      className={cn("flex", "justify-end", className)}
    >
      <TabsPrimitive.List
        className={cn(
          "inline-flex h-9 items-center justify-center rounded-lg bg-input p-1 text-muted-foreground shadow-sm",
          disabled && "opacity-50 pointer-events-none",
        )}
      >
        {toggleList.map((item) => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50",
              "data-[state=active]:bg-card data-[state=active]:text-inner data-[state=active]:shadow-sm",
            )}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}
