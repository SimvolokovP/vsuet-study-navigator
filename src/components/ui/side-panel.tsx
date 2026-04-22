"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Button } from "./button";

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  closeOnBackdropClick?: boolean;
  showCloseButton?: boolean;
}

export function SidePanel({
  isOpen,
  onClose,
  title,
  children,
  className,
  closeOnBackdropClick = true,
  showCloseButton = true,
}: RightSidebarProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-end overflow-hidden", // Изменено с z-60 на z-50
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={closeOnBackdropClick ? onClose : undefined}
      />

      <div
        className={cn(
          "relative h-full z-40 w-full max-w-md border-r-2 border-r-border bg-secondary p-4 shadow-xl",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
          className
        )}
        style={{ width: "75%", maxWidth: "400px" }}
      >
        {(title || showCloseButton) && (
          <div className="mb-4 flex w-full justify-end items-center">
            {title && (
              <h3 className="font-medium text-xl md:text-2xl leading-6 mr-auto">
                {title}
              </h3>
            )}
            {showCloseButton && (
              <Button
                className="h-6 ml-2"
                variant="text"
                onClick={onClose}
                aria-label="Закрыть"
                size="md"
              >
                <X size={24} />
              </Button>
            )}
          </div>
        )}

        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}