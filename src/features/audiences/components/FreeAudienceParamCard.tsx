"use client";

interface ISlotData {
  number: number;
  start_time: string;
  end_time: string;
}

interface FreeAudienceParamCardProps {
  audience: {
    id: number;
    name: string;
  };
  freeSlots: ISlotData[];
  isUserAuthorized: boolean;
  onSlotClick: (
    audience: { id: number; name: string },
    slot: ISlotData,
  ) => void;
}

export function FreeAudienceParamCard({
  audience,
  freeSlots,
  isUserAuthorized,
  onSlotClick,
}: FreeAudienceParamCardProps) {
  return (
    <div className="w-full bg-card border border-border rounded-xl p-4 anim-hover flex flex-col gap-3">
      <div className="flex items-center gap-3 border-b border-border pb-2">
        <div className="bg-success w-2.5 h-2.5 rounded-full" />
        <h4 className="font-bold text-base md:text-lg">
          Аудитория {audience.name.trim() || "—"}
        </h4>
      </div>

      <div className="flex flex-wrap gap-2">
        {freeSlots.map((slot) => {
          const startTimeClean = slot.start_time.slice(0, 5);
          const endTimeClean = slot.end_time.slice(0, 5);

          if (isUserAuthorized) {
            return (
              <button
                key={slot.number}
                type="button"
                onClick={() => onSlotClick(audience, slot)}
                className="px-2.5 py-1 bg-success/10 hover:bg-success/20 text-success text-xs font-medium rounded-lg border border-success/20 transition-colors outline-none cursor-pointer"
                title="Нажмите, чтобы забронировать"
              >
                Пара {slot.number}: {startTimeClean} - {endTimeClean}
              </button>
            );
          }

          return (
            <span
              key={slot.number}
              className="px-2.5 py-1 bg-success/10 text-success text-xs font-medium rounded-lg border border-success/20"
            >
              Пара {slot.number}: {startTimeClean} - {endTimeClean}
            </span>
          );
        })}
      </div>
    </div>
  );
}
