import { Button } from "@/components/ui/button";
import { IFreeAudiencePagedResponse } from "@/shared/types/subject.model";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

interface FreeAudienceParamsResultProps {
  searchFloor: string;
  dataByParams: AxiosResponse<IFreeAudiencePagedResponse>;
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
}

export function FreeAudienceParamsResult({
  dataByParams,
  searchFloor,
  page,
  setPage,
}: FreeAudienceParamsResultProps) {
  const { results, next, previous, count } = dataByParams.data;

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-sm md:text-lg mb-2 md:mb-4 font-bold text-center">
        Свободные аудитории на {searchFloor} этаже:
      </p>

      <div className="flex flex-col gap-3">
        {results.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-4 bg-muted/10 rounded-xl border border-dashed">
            Свободных аудиторий не найдено
          </div>
        ) : (
          results.map((item) => (
            <div
              key={item.audience.id}
              className="w-full bg-card border border-border rounded-xl p-4 anim-hover flex flex-col gap-3"
            >
              <div className="flex items-center gap-3 border-b border-border pb-2">
                <div className="bg-success w-2.5 h-2.5 rounded-full" />
                <h4 className="font-bold text-base md:text-lg">
                  Аудитория {item.audience.name.trim() || "—"}
                </h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.free_slots.map((slot) => {
                  const startTimeClean = slot.start_time.slice(0, 5);
                  const endTimeClean = slot.end_time.slice(0, 5);

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
          ))
        )}
      </div>

      {count > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-between bg-muted/5 border p-2 rounded-xl">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={!previous}
          >
            Назад
          </Button>

          <span className="text-sm font-medium">
            Страница {page} из {totalPages}
          </span>

          <Button onClick={() => setPage((prev) => prev + 1)} disabled={!next}>
            Вперед
          </Button>
        </div>
      )}
    </div>
  );
}
