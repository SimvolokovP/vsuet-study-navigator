import { useCallback } from "react";
import dayjs from "dayjs";
import { cn } from "@/shared/utils/cn";
import { TypeViewMode } from "@/features/schedule/types/schedule.models";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface ResetDateButtonProps {
  onDateChange: (date: string) => void;
  scheduleMode: TypeViewMode;
  selectedDate: string;
  className?: string;
  isPending?: boolean;
}

export function ResetDateButton({
  onDateChange,
  scheduleMode,
  selectedDate,
  className,
  isPending = false,
}: ResetDateButtonProps) {
  const handleTodayClick = useCallback(() => {
    onDateChange(dayjs().format("YYYY-MM-DD"));
  }, [onDateChange]);

  const isTodaySelected =
    scheduleMode === "list"
      ? dayjs(selectedDate).isSame(dayjs(), "day")
      : dayjs(selectedDate).isSame(dayjs(), "week");

  return (
    <>
      {isPending ? (
        <Skeleton />
      ) : (
        <Button
          className={cn("md:h-9", className)}
          variant="default"
          size={"sm"}
          disabled={isTodaySelected}
          onClick={handleTodayClick}
        >
          <span>Сегодня</span>
        </Button>
      )}
    </>
  );
}
