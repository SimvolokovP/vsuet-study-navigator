"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren, useState } from "react";
import { Toaster } from "sonner";

export function Providers({ children }: PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { refetchOnWindowFocus: false } },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster
          position="top-center"
          theme="system"
          // toastOptions={{
          //   unstyled: true,
          //   // Стиль для всех тостов
          //   className: "border border-border bg-card text-foreground text-sm",
          //   // Стиль для заголовка
          //   classNames: {
          //     toast: "group", // Базовый класс
          //     title: "text-foreground font-bold",
          //     description: "text-muted-foreground text-xs",
          //     actionButton: "bg-primary text-primary-foreground",
          //     cancelButton: "bg-muted text-muted-foreground",
          //     success: "border-green-500 bg-green-500/10",
          //     error: "border-destructive bg-destructive/10",
          //     info: "border-blue-500 bg-blue-500/10",
          //     warning: "border-yellow-500 bg-yellow-500/10",
          //   },
          // }}
        />
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
