"use client";

import { TypeViewMode } from "@/features/schedule/types/schedule.models";
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
    <div className="flex gap-2 w-full md:w-auto justify-between md:justify-end">
      <ResetDateButton
        onDateChange={setSelectedDate}
        scheduleMode={viewMode}
        selectedDate={selectedDate}
        isPending={isDataPending}
      />
      <ViewModeToggler
        disabled={isDataPending || !!dataError}
        onViewModeChange={onViewModeChange}
        viewMode={viewMode}
        isPending={isDataPending}
      />
    </div>
  );
}
