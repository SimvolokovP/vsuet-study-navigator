"use client";

import { cn } from "@/shared/utils/cn";
import dayjs from "dayjs";
import { useMemo } from "react";
import { getWeekDaysToList, getWeekType } from "@/shared/helpers/dateHelpers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MONTH_NAMES_GENITIVE, WEEKDAY_NAMES } from "@/shared/data/date.data";
import { Button } from "@/components/ui/button";

interface WeekDaysProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export function WeekDays({ selectedDate, onDateChange }: WeekDaysProps) {
  const currentWeek = useMemo(() => {
    return dayjs(selectedDate).startOf("week").add(1, "day");
  }, [selectedDate]);

  const handlePrevWeek = () => {
    const newWeek = currentWeek.subtract(1, "week");
    onDateChange(newWeek.format("YYYY-MM-DD"));
  };

  const handleNextWeek = () => {
    const newWeek = currentWeek.add(1, "week");
    onDateChange(newWeek.format("YYYY-MM-DD"));
  };

  const weekDays = getWeekDaysToList(currentWeek);
  const selectedDay = dayjs(selectedDate);
  const displayDate = `${selectedDay.date()} ${
    MONTH_NAMES_GENITIVE[selectedDay.month()]
  }`;
  const weekdayName = WEEKDAY_NAMES[selectedDay.day()];
  const weekType = getWeekType(selectedDay);

  if (!selectedDate) {
    return null;
  }

  return (
    <div className="py-2 md:py-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="text" onClick={handlePrevWeek} className="p-2">
          <ChevronLeft size={24} />
        </Button>

        <div className="text-lg md:text-2xl font-medium text-center">
          <div>{displayDate}</div>
          <div className="text-sm md:text-base font-normal flex items-center gap-1">
            <span>{weekdayName}</span> <span>|</span>
            <span>
              {weekType === "numerator" ? "Числитель" : "Знаменатель"}
            </span>
          </div>
        </div>

        <Button variant="text" onClick={handleNextWeek} className="p-2">
          <ChevronRight size={24} />
        </Button>
      </div>

      <div className="flex justify-between ">
        {weekDays.map((day) => (
          <div
            key={`${day.name}-${day.date}`}
            className={cn("flex flex-col items-center")}
          >
            <div
              className={cn(
                "mb-2",
                day.isToday ? "font-bold" : "",
                day.isPast ? "opacity-50" : "",
              )}
            >
              {day.name}
            </div>
            <Button
              className={`w-10 h-10 md:w-11.25 md:h-11.25`}
              variant={
                selectedDate === day.dateString
                  ? "primary"
                  : day.isToday
                    ? "default"
                    : "text"
              }
              onClick={() => onDateChange(day.dateString)}
            >
              {day.date}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
