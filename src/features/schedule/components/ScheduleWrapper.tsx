"use client";

import { ISubject } from "@/shared/types/subject.model";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import dayjs from "@/shared/utils/dayjs";
import {
  TypeSchduleType,
  TypeViewMode,
} from "@/features/schedule/types/schedule.models";
import { ScheduleListWrapper } from "./list/ScheduleListWrapper";
import { ScheduleCalendarWrapper } from "./calendar/ScheduleCalendarWrapper";

interface ScheduleWrapperProps {
  viewMode: TypeViewMode;
  data: ISubject[] | undefined;
  isPending: boolean;
  error: Error | null;
  scheduleType?: TypeSchduleType;
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

export function ScheduleWrapper({
  viewMode,
  data,
  error,
  isPending,
  scheduleType = "weekly",
  selectedDate,
  setSelectedDate,
}: ScheduleWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDateChange = useCallback(
    (days: number) => {
      const currentDayjs = dayjs(selectedDate);

      if (viewMode === "list") {
        let nextDate = currentDayjs.add(days, "day");

        if (nextDate.day() === 0) {
          nextDate = nextDate.add(days > 0 ? 1 : -1, "day");
        }

        setSelectedDate(nextDate.format("YYYY-MM-DD"));
      } else {
        let nextDate = currentDayjs.add(days, "week");

        if (nextDate.day() === 0) {
          nextDate = nextDate.add(1, "day");
        }

        setSelectedDate(nextDate.format("YYYY-MM-DD"));
      }
    },
    [selectedDate, setSelectedDate, viewMode],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handleDateChange(-1);
      } else if (e.key === "ArrowRight") {
        handleDateChange(1);
      }
    },
    [handleDateChange],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("keydown", handleKeyDown);
      return () => {
        container.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleKeyDown]);

  return (
    <div className="h-full" ref={containerRef} tabIndex={0}>
      {viewMode === "list" && (
        <>
          <ScheduleListWrapper
            scheduleType={scheduleType}
            subjectsList={data}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            isPending={isPending}
            error={error}
          />
        </>
      )}

      {viewMode === "calendar" && (
        <>
          <ScheduleCalendarWrapper
            scheduleType={scheduleType}
            subjectsList={data}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            isPending={isPending}
            error={error}
          />
        </>
      )}
    </div>
  );
}
