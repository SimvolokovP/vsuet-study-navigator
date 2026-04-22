"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Root
> {
  label?: string;
  placeholder?: string;
  error?: { message?: string };
  options: SelectOption[];
  onChange?: (event: { target: { value: string; name?: string } }) => void;
  name?: string;
}

export const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectProps
>(({ label, error, options, placeholder, onChange, name, ...props }, ref) => (
  <div className="space-y-2">
    {label && (
      <label className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
    )}
    <SelectPrimitive.Root
      onValueChange={(val) => onChange?.({ target: { value: val, name } })}
      {...props}
    >
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-input bg-input px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-rating-bad focus:ring-rating-bad/50",
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="relative z-50 min-w-32 overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          position="popper"
          sideOffset={4}
        >
          <SelectPrimitive.Viewport className="h-[var(--radix-select-content-available-height)] w-full min-w-[var(--radix-select-trigger-width)] p-1">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <SelectPrimitive.ItemIndicator>
                    <Check className="h-4 w-4" />
                  </SelectPrimitive.ItemIndicator>
                </span>
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
    {error?.message && (
      <p className="text-xs font-medium text-destructive animate-in fade-in-50">
        {error.message}
      </p>
    )}
  </div>
));

Select.displayName = "Select";
