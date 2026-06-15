"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SystemThemeListener } from "@/features/theme/components/SystemThemeListener";
import { ThemeInitializer } from "@/features/theme/components/ThemeInitializer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { Toaster } from "sonner";
import { ConnectivityListener } from "./connectivity-listener";

export function Providers({ children }: PropsWithChildren) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            retry: 1,
            staleTime: 5 * 60 * 1000,
            gcTime: 24 * 60 * 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      <ThemeInitializer />
      <SystemThemeListener />
      <Toaster position="top-center" theme="system" />
      <ConnectivityListener />
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </QueryClientProvider>
  );
}
