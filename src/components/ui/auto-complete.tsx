"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./combobox";

export interface AutoCompleteOption {
  value: string;
  label: string;
}

interface AutoCompleteProps {
  options: AutoCompleteOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: Error | null;
  className?: string;
  disabled?: boolean;
  name?: string;
  isLoading?: boolean;
  clearable?: boolean;
}

export function AutoComplete({
  options,
  value,
  onChange,
  label,
  placeholder = "Выберите вариант...",
  error,
  className,
  disabled = false,
  name,
  isLoading = false,
  clearable = true,
}: AutoCompleteProps) {
  const [open, setOpen] = React.useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = React.useCallback(
    (currentValue: string) => {
      const newValue = currentValue === value ? "" : currentValue;
      onChange(newValue);
      setOpen(false);
    },
    [value, onChange],
  );

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="default"
              role="combobox"
              aria-expanded={open}
              disabled={disabled || isLoading}
              name={name}
              className={cn(
                "w-full justify-between font-normal relative",
                !value && "text-muted-foreground",
                error && "border-destructive focus-visible:ring-destructive/50",
              )}
            >
              <span className="truncate">
                {isLoading
                  ? "Загрузка..."
                  : selectedOption
                    ? selectedOption.label
                    : placeholder}
              </span>
              <div className="flex items-center gap-1">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin opacity-50" />
                ) : (
                  <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[--radix-popover-trigger-width] p-0"
            align="start"
            sideOffset={4}
          >
            <Command
              filter={(value, search) => {
                if (value.toLowerCase().includes(search.toLowerCase()))
                  return 1;
                return 0;
              }}
            >
              <CommandInput placeholder="Поиск..." />
              <CommandList>
                <CommandEmpty>Ничего не найдено.</CommandEmpty>
                <CommandGroup>
                  {options.map((opt) => (
                    <CommandItem
                      key={opt.value}
                      value={opt.label}
                      onSelect={() => {
                        handleSelect(opt.value);
                      }}
                      className="flex items-center text-foreground opacity-100! cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === opt.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {opt.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {clearable && value && !isLoading && !disabled && (
          <div
            onClick={handleClear}
            className="rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </div>
        )}
      </div>
      {error?.message && (
        <p className="text-xs font-medium text-destructive animate-in fade-in-50">
          {error.message}
        </p>
      )}
    </div>
  );
}
