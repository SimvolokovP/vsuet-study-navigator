import { Skeleton } from "@/components/ui/skeleton";


export function ScheduleListSkeleton() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-170">
        <div className="py-4">
          <div className="flex w-full justify-between mb-4">
            <Skeleton className="w-12.5 h-12.5" />
            <Skeleton className="w-40.5 h-12.5" />
            <Skeleton className="w-12.5 h-12.5" />
          </div>
          <div className="flex justify-between gap-2 mb-4">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-19.25 w-11.25" />
            ))}
          </div>
        </div>
        <ul className="w-full flex flex-col gap-4 mt-4">
          {[...Array(3)].map((_, i) => (
            <li key={i}>
              <div className="flex items-center gap-2 mb-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="flex-1 h-px" />
              </div>
              <Skeleton className="h-24 w-full" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
