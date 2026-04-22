import { cn } from "@/shared/utils/cn";
import { PropsWithChildren } from "react";

interface BadgeProps {
  className?: string;
  text: string;
  isHide?: boolean;
}

export function Badge({
  children,
  text = "",
  className,
  isHide = false,
}: PropsWithChildren<BadgeProps>) {
  return (
    <div className="relative">
      <div>{children}</div>

      {!isHide && (
        <div
          className={cn(
            `flex
            justify-center
            items-center
            text-center
          absolute
          -top-1
          -right-1
          rounded-full
          text-xs
          z-20
          pointer-events-none
          bg-primary
          text-white
          font-medium
        `,
            className,
          )}
        >
          {text}
        </div>
      )}
    </div>
  );
}
