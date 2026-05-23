"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/shared/utils/cn";

interface TogglerProps {
  toggleList: { label: React.ReactNode; value: string }[];
  activeToggleItem: string;
  onToggleChange: (value: string) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function Toggler({
  toggleList,
  activeToggleItem,
  onToggleChange,
  disabled,
  fullWidth = false, 
  className,
}: TogglerProps) {
  return (
    <TabsPrimitive.Root
      value={activeToggleItem}
      onValueChange={onToggleChange}
      className={cn(
        "flex",
        "justify-center",
        fullWidth && "w-full", 
        className,
      )}
    >
      <TabsPrimitive.List
        className={cn(
          "inline-flex border border-border h-9 items-center justify-center rounded-lg bg-input/60 p-1 text-muted-foreground shadow-sm",
          fullWidth && "w-full", 
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
              fullWidth && "flex-1", 
            )}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}
