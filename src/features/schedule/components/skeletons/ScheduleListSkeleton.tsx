import { Skeleton } from "@/components/ui/skeleton";

export function ScheduleListSkeleton() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-170">
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
