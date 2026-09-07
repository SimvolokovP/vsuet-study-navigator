"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("flex flex-col w-full", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    rightContent?: React.ReactNode;
  }
>(({ className, children, rightContent, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between bg-card py-2 px-4 border border-border transition-all duration-200 cursor-pointer group outline-none",
        "data-[state=open]:border-transparent data-[state=open]:rounded-t-xl",
        "data-[state=closed]:border-border data-[state=closed]:rounded-xl data-[state=closed]:hover:shadow-sm",
        className,
      )}
      {...props}
    >
      <div className="text-base md:text-lg font-medium">{children}</div>
      <div className="flex items-center gap-3">
        {rightContent}
        <div
          className={cn(
            "p-0.5 rounded-full transition-colors duration-200",
            "group-data-[state=open]:bg-accent/85 group-data-[state=closed]:bg-border",
          )}
        >
          <ChevronDown
            size={24}
            className="transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180"
          />
        </div>
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("border-t-2 border-border", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
