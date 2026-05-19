"use client";

import { Ellipsis } from "lucide-react";

interface FreeSlotRowProps {
  number: number;
  startTimeFormatted: string;
  endTimeFormatted: string;
  isThisSlotCurrent: boolean;
  showBookingButton: boolean;
  onBookClick: () => void;
}

export function FreeSlotRow({
  number,
  startTimeFormatted,
  endTimeFormatted,
  isThisSlotCurrent,
  showBookingButton,
  onBookClick,
}: FreeSlotRowProps) {
  return (
    <div
      className={`w-full bg-card border rounded-xl p-4 flex items-center justify-between transition-all ${
        isThisSlotCurrent
          ? "border-success shadow-sm shadow-emerald-500/10 bg-success/5"
          : "border-border"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-3 h-3 rounded-full ${isThisSlotCurrent ? "bg-success" : "bg-muted-foreground/40"}`}
        />
        <div
          className={`text-sm md:text-base font-medium ${isThisSlotCurrent ? "text-success" : "text-foreground"}`}
        >
          Пара {number}: {startTimeFormatted} - {endTimeFormatted}
        </div>
      </div>

      {showBookingButton && (
        <button
          type="button"
          onClick={onBookClick}
          className="p-1.5 rounded-full transition-colors duration-200 bg-border hover:bg-accent text-foreground hover:text-accent-foreground outline-none"
          title="Забронировать этот слот"
        >
          <Ellipsis size={20} />
        </button>
      )}
    </div>
  );
}
