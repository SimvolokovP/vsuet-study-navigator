"use client";

import { cn } from "@/shared/utils/cn";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, ReactNode } from "react";

interface AccordionProps {
  title: ReactNode;
  rightContent?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
  onToggle?: (isOpen: boolean) => void;
}

export function Accordion({
  title,
  rightContent,
  defaultOpen = true,
  children,
  className,
  onToggle,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, children]);

  const toggleAccordion = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div
        className={cn(
          "bg-secondary py-2 px-4 border-2 border-border anim-hover cursor-pointer transition-all duration-200",
          isOpen
            ? "border-transparent rounded-t-sm"
            : "border-border rounded-sm",
        )}
        onClick={toggleAccordion}
      >
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium">{title}</div>
          <div className="flex items-center gap-3">
            {rightContent}
            <div
              className={cn(
                "p-0.5 rounded-full transition-colors duration-200",
                isOpen ? "bg-accent" : "bg-border",
              )}
            >
              <ChevronDown
                size={24}
                className={cn(
                  "transition-transform duration-300 ease-in-out",
                  isOpen ? "rotate-180" : "rotate-0",
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${height}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="border-t-2 border-border" ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
}
