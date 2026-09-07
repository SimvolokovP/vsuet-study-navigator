import { ReactNode } from "react";
import { X } from "lucide-react";
import { Drawer as VaulDrawer } from "vaul";
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

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  className,
  closeOnBackdropClick = true,
  showCloseButton = true,
}: RightSidebarProps) {
  return (
    <VaulDrawer.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      direction="bottom"
      dismissible={closeOnBackdropClick}
      modal
    >
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
        <VaulDrawer.Content
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 outline-none",
            "md:bottom-0 md:left-auto md:right-0 md:top-0 md:w-[75%] md:max-w-100",
          )}
        >
          <div
            className={cn(
              "m-2.5 flex h-full flex-col border border-border bg-popover p-6 text-popover-foreground",
              "rounded-3xl",
              "max-h-[calc(92dvh-1.25rem)] md:h-[calc(100dvh-1.25rem)] md:max-h-none",
              className,
            )}
          >
            <VaulDrawer.Title
              className={cn(
                "text-lg font-semibold leading-none tracking-tight text-foreground",
                !title && "sr-only",
              )}
            >
              {title || "Панель"}
            </VaulDrawer.Title>
            <VaulDrawer.Description className="sr-only">
              {title ? `Содержимое панели: ${title}` : "Содержимое панели"}
            </VaulDrawer.Description>

            <VaulDrawer.Handle className="mx-auto mb-4 mt-1 h-1 w-12 shrink-0 rounded-full bg-muted md:hidden" />

            {(title || showCloseButton) && (
              <div className="mb-6 flex w-full shrink-0 items-start justify-between gap-4">
                {title && (
                  <h3 className="text-lg font-semibold leading-none tracking-tight text-foreground">
                    {title}
                  </h3>
                )}
                {showCloseButton && (
                  <Button
                    className="ml-auto h-8 w-8 shrink-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none hidden md:flex"
                    variant="text"
                    onClick={onClose}
                    aria-label="Закрыть"
                    size="md"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
            <div className="flex-1 overflow-y-auto text-sm text-muted-foreground [scrollbar-width:thin]">
              {children}
            </div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
