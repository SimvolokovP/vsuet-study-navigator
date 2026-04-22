"use client";

import { TypeViewMode } from "@/features/types/schedule.models";
import { ViewModeToggler } from "./ViewModeToggler";
import { ResetDateButton } from "./ResetDateButton";

interface ScheduleActionsProps {
  onViewModeChange: (mode: TypeViewMode) => void;
  viewMode: TypeViewMode;
  isDataPending: boolean;
  dataError: Error | null;
  selectedDate: string;
  setSelectedDate: (s: string) => void;
}

export function ScheduleActions({
  onViewModeChange,
  viewMode,
  isDataPending,
  dataError,
  selectedDate,
  setSelectedDate,
}: ScheduleActionsProps) {
  return (
    <div className="flex flex-col gap-1">
      <ViewModeToggler
        disabled={isDataPending || !!dataError}
        onViewModeChange={onViewModeChange}
        viewMode={viewMode}
        isPending={isDataPending}
      />
      <ResetDateButton
        onDateChange={setSelectedDate}
        scheduleMode={viewMode}
        selectedDate={selectedDate}
        isPending={isDataPending}
      />
    </div>
  );
}
