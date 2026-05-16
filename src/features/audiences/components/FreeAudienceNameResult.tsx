import { useState } from "react";
import { IFreeAudienceDetailResponse } from "@/shared/types/subject.model";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalTitle,
} from "@/components/ui/modal";

dayjs.extend(isBetween);

interface FreeAudienceNameResultProps {
  dataByName: AxiosResponse<IFreeAudienceDetailResponse>;
  searchDatetime: string;
}

export function FreeAudienceNameResult({
  dataByName,
  searchDatetime,
}: FreeAudienceNameResultProps) {
  const [isNearestOpen, setIsNearestOpen] = useState(false);
  const searchTimeStr = dayjs(searchDatetime).format("HH:mm");

  const baseDate = "2000-01-01";
  const targetTime = dayjs(`${baseDate} ${searchTimeStr}`);

  const isTargetSlotFree = dataByName.data.free_slots.some((slot) => {
    const startClean = slot.start_time.slice(0, 5);
    const endClean = slot.end_time.slice(0, 5);

    const start = dayjs(`${baseDate} ${startClean}`);
    const end = dayjs(`${baseDate} ${endClean}`);
    return targetTime.isBetween(start, end, null, "[]");
  });

  return (
    <div className="w-full">
      <div className="bg-card border border-border rounded-xl p-4 anim-hover mb-4 md:mb-6">
        <div className="flex flex-col gap-2 items-center justify-center text-center">
          <h3 className="font-bold text-lg md:text-xl">
            Аудитория: {dataByName.data.audience.name}
          </h3>
          {dataByName.data.audience.floor ? (
            <div className="text-sm">Этаж {dataByName.data.audience.floor}</div>
          ) : (
            <></>
          )}

          <div className="mt-2 w-full border-t border-border pt-3">
            {isTargetSlotFree ? (
              <div className="flex items-center justify-center gap-2 text-success font-semibold text-sm md:text-base">
                <div className="bg-success w-2.5 h-2.5 rounded-full animate-pulse" />
                Аудитория свободна на выбранное время ({searchTimeStr})
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center justify-center gap-2 text-destructive font-semibold text-sm md:text-base">
                  <div className="bg-destructive w-2.5 h-2.5 rounded-full" />
                  На выбранное время ({searchTimeStr}) аудитория занята
                </div>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => setIsNearestOpen(true)}
                >
                  Показать ближайшие свободные аудитории
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm md:text-lg mb-2 md:mb-4 font-bold text-center">
        Все доступные свободные слоты на этот день:
      </p>

      <div className="flex flex-col gap-2 md:gap-3">
        {dataByName.data.free_slots.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-4 bg-muted/10 rounded-xl border border-dashed">
            Нет свободных слотов на весь день
          </div>
        ) : (
          dataByName.data.free_slots.map((slot) => {
            const startTimeFormatted = slot.start_time.slice(0, 5);
            const endTimeFormatted = slot.end_time.slice(0, 5);

            const isThisSlotCurrent = targetTime.isBetween(
              dayjs(`${baseDate} ${startTimeFormatted}`),
              dayjs(`${baseDate} ${endTimeFormatted}`),
              null,
              "[]",
            );

            return (
              <div
                key={slot.number}
                className={`w-full bg-card border rounded-xl p-4 flex items-center justify-between transition-all ${
                  isThisSlotCurrent
                    ? "border-success shadow-sm shadow-emerald-500/10 bg-success/5"
                    : "border-border"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${isThisSlotCurrent ? "bg-success" : "bg-muted-foreground/40"}`}
                />
                <div
                  className={`text-sm md:text-base font-medium ${isThisSlotCurrent ? "text-success" : "text-foreground"}`}
                >
                  Пара {slot.number}: {startTimeFormatted} - {endTimeFormatted}
                </div>
                <div className="w-3"></div>
              </div>
            );
          })
        )}
      </div>

      <Modal open={isNearestOpen} onOpenChange={setIsNearestOpen}>
        <ModalContent className="p-3 md:p-6">
          <ModalTitle className="font-bold text-lg">
            Ближайшие свободные аудитории
          </ModalTitle>

          <div className="max-h-[60vh] overflow-y-auto pr-1 flex flex-col gap-3">
            {!dataByName.data.nearest ||
            dataByName.data.nearest.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Альтернативных вариантов не найдено
              </p>
            ) : (
              dataByName.data.nearest.map((item) => (
                <div
                  key={item.audience.id}
                  className="p-2 md:p-4 border border-border rounded-xl bg-card"
                >
                  <h4 className="font-semibold text-sm md:text-base mb-2">
                    Аудитория {item.audience.name} (Этаж {item.audience.floor})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.free_slots.map((slot) => (
                      <span
                        key={slot.number}
                        className="px-2 py-0.5 bg-success/10 text-success text-xs font-medium rounded"
                      >
                        Пара {slot.number}: {slot.start_time.slice(0, 5)}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
