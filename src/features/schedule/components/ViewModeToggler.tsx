import { Skeleton } from "@/components/ui/skeleton";
import { Toggler } from "@/components/ui/toggler";
import { TypeViewMode } from "@/features/types/schedule.models";
import { CalendarFold, List } from "lucide-react";

interface ViewModeTogglerProps {
  viewMode: TypeViewMode;
  onViewModeChange: (v: TypeViewMode) => void;
  disabled?: boolean;
  isPending?: boolean;
}

const viewModeItems = [
  { label: <List />, value: "list" },
  { label: <CalendarFold />, value: "calendar" },
];

export function ViewModeToggler({
  onViewModeChange,
  viewMode,
  disabled = false,
  isPending = false,
}: ViewModeTogglerProps) {
  return (
    <div>
      {isPending ? (
        <>
          <Skeleton className="w-23.5 h-8" />
        </>
      ) : (
        <Toggler
          className=""
          toggleList={viewModeItems}
          activeToggleItem={viewMode}
          onToggleChange={(v: string) => onViewModeChange(v as TypeViewMode)}
          disabled={disabled}
        />
      )}
    </div>
  );
}
