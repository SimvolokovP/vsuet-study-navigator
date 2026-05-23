import { IFreeAudienceItem } from "@/shared/types/subject.model";

interface FreeAudienceCardProps {
  freeAudiencesData: IFreeAudienceItem[];
}

export function FreeAudienceCard({ freeAudiencesData }: FreeAudienceCardProps) {
//   if (!freeAudiencesData || freeAudiencesData.length === 0) {
//     return (
//       <ErrorMessage
//         text="Свободные аудитории по заданным параметрам не найдены"
//         error={{
//           message: "Не смогли найти",
//           name: "Не смогли найти",
//         }}
//       />
//     );
//   }

  return (
    <div className="flex flex-col gap-6">
      {freeAudiencesData.map((item) => {
        if (!item.audience) return null;

        return (
          <div
            key={item.audience.id}
            className="flex flex-col gap-4 border rounded-lg p-4 bg-card text-card-foreground shadow-sm"
          >
            <div className="text-center pb-2 border-b border-border">
              <h2 className="text-xl font-bold">
                Аудитория: {item.audience.name}
              </h2>
              {item.audience.floor && item.audience.floor !== 0 ? (
                <p className="text-sm text-muted-foreground mt-1">
                  Этаж: {item.audience.floor}
                </p>
              ) : null}
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-left text-sm">
                Свободные слоты:
              </h3>
              {item.free_slots.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-2">
                  Нет свободных слотов на выбранное время
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {item.free_slots.map((slot) => (
                    <div
                      key={slot.number}
                      className="flex justify-between items-center p-2 rounded bg-muted/20 text-sm border border-border/50"
                    >
                      <span className="font-medium">Пара №{slot.number}</span>
                      <span className="text-muted-foreground">
                        {slot.start_time.slice(0, 5)} —{" "}
                        {slot.end_time.slice(0, 5)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
