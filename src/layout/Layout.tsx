"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, ReactNode } from "react";

interface LayoutProps {
  title?: string | ReactNode;
  description?: string;
  actions?: ReactNode;
  rightButton?: ReactNode;
  withBackButton?: boolean;
}

export function Layout({
  children,
  title = "",
  description = "",
  withBackButton = false,
  actions,
  rightButton,
}: PropsWithChildren<LayoutProps>) {
  const router = useRouter();

  return (
    <div className="h-full">
      <div className="shrink-0 pt-4 md:pt-9 px-1 md:px-2">
        <div className="md:hidden flex w-full items-center justify-between pb-2">
          <div className="w-10">
            {withBackButton && (
              <button onClick={() => router.back()} className="p-1">
                <ChevronLeft size={24} />
              </button>
            )}
          </div>
          <h3 className="font-bold md:text-3xl text-center">{title}</h3>
          <div className="w-10">{rightButton && rightButton}</div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between mb-2 md:mb-4 gap-2">
          <h3 className="font-bold hidden md:text-3xl md:block">{title}</h3>
          <div className="hidden md:block">{rightButton}</div>
        </div>
        {actions}
        <p className="font-normal text-sm md:text-lg mb-2">{description}</p>
      </div>

      <div className="h-full px-1 md:px-8 pb-19 md:pb-9">
        {children}
      </div>
    </div>
  );
}
