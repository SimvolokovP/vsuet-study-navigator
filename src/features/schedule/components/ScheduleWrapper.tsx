"use client";

// import { ScheduleListWrapper } from "./ScheduleListWrapper";
// import { ScheduleCalendarWrapper } from "./ScheduleCalendarWrapper";
import { ISubject } from "@/shared/types/subject.model";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { ScheduleListSkeleton } from "./skeletons/ScheduleListSkeleton";
import { ScheduleCalendarSkeleton } from "./skeletons/ScheduleCalendarSkeleton";
import dayjs from "@/shared/utils/dayjs";
import {
  TypeSchduleType,
  TypeViewMode,
} from "@/features/schedule/types/schedule.models";
import { ErrorMessage } from "@/widgets/ErrorMessage";
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
      if (viewMode === "list") {
        setSelectedDate(
          dayjs(selectedDate).add(days, "day").format("YYYY-MM-DD"),
        );
      } else {
        setSelectedDate(
          dayjs(selectedDate).add(days, "week").format("YYYY-MM-DD"),
        );
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

  if (error) {
    return (
      <ErrorMessage
        error={error}
        text="Произошла ошибка при загрузке расписания. Пожалуйста, перезагрузите
        страницу или попробуйте позже."
      />
    );
  }

  return (
    <div className="h-full" ref={containerRef} tabIndex={0}>
      {viewMode === "list" && (
        <>
          {isPending ? (
            <ScheduleListSkeleton />
          ) : (
            <ScheduleListWrapper
              scheduleType={scheduleType}
              subjectsList={data}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          )}
        </>
      )}

      {viewMode === "calendar" && (
        <>
          {isPending ? (
            <ScheduleCalendarSkeleton />
          ) : (
            <ScheduleCalendarWrapper
              scheduleType={scheduleType}
              subjectsList={data}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          )}
        </>
      )}
    </div>
  );
}
