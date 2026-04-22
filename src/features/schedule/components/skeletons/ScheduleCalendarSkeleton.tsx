import { cn } from "@/shared/utils/cn";
import { TIME_SLOTS } from "@/shared/data/date.data";
import { getWeekDays } from "@/shared/helpers/dateHelpers";
import dayjs from "dayjs";
import { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ScheduleCalendarSkeleton() {
  const weekDays = getWeekDays(dayjs().startOf("week").add(1, "day"));

  return (
    <div className="flex flex-col h-[calc(100vh-95px)] md:h-[calc(100vh-90px)] mb-2 md:mb-4">
      <div className="flex justify-between items-center p-4">
        <div className="w-full flex justify-center">
          <Skeleton className="h-[32px] w-[300px]" />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-8 min-w-[800px]">
          <div className="sticky top-0 z-10 bg-background p-2"></div>

          {weekDays.map((day) => (
            <div
              key={`day-header-${day.dateString}`}
              className={cn(
                "sticky top-0 z-10 bg-background border-b border-calendar-border p-1 md:p-2 text-center"
              )}
            >
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}

          {TIME_SLOTS.map((timeSlot) => (
            <Fragment
              key={`timeslot-${timeSlot.start_time}-${timeSlot.end_time}`}
            >
              <div className="sticky left-0 z-10 bg-background border-r border-calendar-border p-1 md:p-2">
                <Skeleton className="h-4 w-full" />
              </div>

              {weekDays.map((day) => (
                <div
                  key={`cell-${day.dateString}-${timeSlot.start_time}`}
                  className={cn(
                    "border-b border-calendar-border border-r p-1 min-h-[60px] md:min-h-[80px]",
                    Math.random() > 0.7
                      ? "flex items-center justify-center"
                      : ""
                  )}
                ></div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
