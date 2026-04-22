import { cn } from "@/shared/utils/cn";
import { HTMLAttributes } from "react";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/30",
        className
      )}
      {...props}
    />
  );
}
