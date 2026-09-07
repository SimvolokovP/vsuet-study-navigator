import { Skeleton } from "@/shared/components/ui/skeleton";

export function ScheduleCalendarSkeleton() {
  return (
    <div className="flex flex-col h-30 mb-2 md:mb-4">
      <Skeleton className="w-full h-full" />
    </div>
  );
}
