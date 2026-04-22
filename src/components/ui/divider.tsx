import { cn } from "@/shared/utils/cn";

import { HTMLAttributes } from "react";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return <div className={cn("h-0.5 bg-border", className)}></div>;
}
