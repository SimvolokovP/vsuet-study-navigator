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
        <Toaster position="top-center" theme="system" />
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
