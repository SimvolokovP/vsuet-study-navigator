import { Toggler } from "@/components/ui/toggler";
import { TypeViewMode } from "@/features/schedule/types/schedule.models";
import { cn } from "@/shared/utils/cn";
import { CalendarFold, List } from "lucide-react";

interface ViewModeTogglerProps {
  viewMode: TypeViewMode;
  onViewModeChange: (v: TypeViewMode) => void;
  disabled?: boolean;
  isPending?: boolean;
  className?: string;
}

const viewModeItems = [
  {
    label: (
      <span className="flex items-center gap-2">
        <List size={20} /> Лента
      </span>
    ),
    value: "list",
  },
  {
    label: (
      <span className="flex items-center gap-2">
        <CalendarFold size={20} /> Календарь
      </span>
    ),
    value: "calendar",
  },
];

export function ViewModeToggler({
  onViewModeChange,
  viewMode,
  disabled = false,
  isPending = false,
  className,
}: ViewModeTogglerProps) {
  return (
    <div className="flex justify-center w-full">
      <div className="max-w-170 w-full">
        <Toggler
          fullWidth
          className={cn(className, "w-full")}
          toggleList={viewModeItems}
          activeToggleItem={viewMode}
          onToggleChange={(v: string) => onViewModeChange(v as TypeViewMode)}
          disabled={disabled || isPending}
        />
      </div>
    </div>
  );
}
