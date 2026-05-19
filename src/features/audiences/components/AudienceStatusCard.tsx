"use client";

import { Button } from "@/components/ui/button";

interface AudienceStatusCardProps {
  audienceName: string;
  floor?: number | null;
  isTargetSlotFree: boolean;
  searchTimeStr: string;
  onOpenNearest: () => void;
}

export function AudienceStatusCard({
  audienceName,
  floor,
  isTargetSlotFree,
  searchTimeStr,
  onOpenNearest,
}: AudienceStatusCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 anim-hover mb-4 md:mb-6">
      <div className="flex flex-col gap-2 items-center justify-center text-center">
        <h3 className="font-bold text-lg md:text-xl">
          Аудитория: {audienceName}
        </h3>
        {floor && (
          <div className="text-sm text-muted-foreground">Этаж {floor}</div>
        )}

        <div className="mt-2 w-full border-t border-border pt-3">
          {isTargetSlotFree ? (
            <div className="flex items-center justify-center gap-2 text-success font-semibold text-sm md:text-base">
              <div className="bg-success w-2.5 h-2.5 rounded-full animate-pulse" />
              Аудитория свободна на выбранное время ({searchTimeStr})
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center gap-2 text-destructive font-semibold text-sm md:text-base">
                <div className="bg-destructive w-2.5 h-2.5 rounded-full" />
                На выбранное время ({searchTimeStr}) аудитория занята
              </div>
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={onOpenNearest}
              >
                Показать ближайшие свободные аудитории
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
