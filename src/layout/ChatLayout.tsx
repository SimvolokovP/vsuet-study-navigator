"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, ReactNode } from "react";

interface LayoutProps {
  title?: string | ReactNode;
}

export function ChatLayout({
  children,
  title = "",
}: PropsWithChildren<LayoutProps>) {
  const router = useRouter();

  return (
    <div className="h-full max-h-full flex flex-col bg-card rounded-xl border-border border overflow-hidden">
      <div className="shrink-0 pt-2 md:pt-4 px-1 md:px-2">
        <div className="flex w-full items-center justify-between pb-2">
          <div className="w-10">
            <button onClick={() => router.back()} className="p-1">
              <ChevronLeft size={24} />
            </button>
          </div>
          <h3 className="font-bold md:text-xl text-center">{title}</h3>
          <div className="w-10"></div>
        </div>
      </div>

      <main className="flex-1 min-h-0 overflow-hidden">{children}</main>
    </div>
  );
}