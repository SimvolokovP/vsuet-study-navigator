"use client";

import { Dayjs } from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MONTH_NAMES } from "@/shared/data/date.data";
import { getWeekType } from "@/shared/helpers/dateHelpers";
import { Button } from "@/shared/components/ui/button";

interface CalendarControlProps {
  currentWeek: Dayjs;
  onWeekChange: (newWeek: Dayjs) => void;
  isPending: boolean;
}

export function CalendarControl({
  currentWeek,
  onWeekChange,
  isPending,
}: CalendarControlProps) {
  const monthName = MONTH_NAMES[currentWeek.month()];
  const weekType = getWeekType(currentWeek);

  const startOfWeek = currentWeek.startOf("week").add(1, "day");
  const endOfWeek = currentWeek.endOf("week");

  const formatWeekRange = () => {
    if (startOfWeek.month() === endOfWeek.month()) {
      return `${monthName}, ${startOfWeek.date()}-${endOfWeek.date()}`;
    } else {
      return `${startOfWeek.date()} ${
        MONTH_NAMES[startOfWeek.month()]
      } - ${endOfWeek.date()} ${MONTH_NAMES[endOfWeek.month()]}`;
    }
  };

  const handlePrevWeek = () => {
    const newWeek = currentWeek.subtract(1, "week");
    onWeekChange(newWeek);
  };

  const handleNextWeek = () => {
    const newWeek = currentWeek.add(1, "week");
    onWeekChange(newWeek);
  };

  return (
    <div className="flex justify-center gap-1 md:gap-5 items-center mb-2 md:mb-4">
      <Button
        disabled={isPending}
        variant="text"
        onClick={handlePrevWeek}
        className="p-1 md:p-2"
      >
        <ChevronLeft size={24} />
      </Button>

      <div className="text-center">
        <div className="font-normal flex-col text-[12px] md:text-sm min-w-63 md:min-w-90 md:font-medium flex justify-center flew-wrap items-center">
          <div className="flex items-center flex-wrap justify-center gap-1">
            <div>{formatWeekRange()}</div>
          </div>
          <div className="font-bold">
            {weekType === "numerator" ? "Числитель" : "Знаменатель"}
          </div>
        </div>
      </div>

      <Button
        disabled={isPending}
        variant="text"
        onClick={handleNextWeek}
        className="p-1 md:p-2"
      >
        <ChevronRight size={24} />
      </Button>
    </div>
  );
}
