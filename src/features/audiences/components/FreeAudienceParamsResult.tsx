"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IFreeAudiencePagedResponse } from "@/shared/types/subject.model";
import { AxiosResponse } from "axios";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { FreeAudienceParamCard } from "./FreeAudienceParamCard";
import dayjs from "dayjs";
import { useCreateReservation } from "../hooks/use-create-reservation";
import { ConfirmBookingModal } from "./ConfirmBookingModal";

interface ISlotData {
  number: number;
  start_time: string;
  end_time: string;
}

interface ISelectedBooking {
  audience: { id: number; name: string };
  slot: ISlotData;
}

interface FreeAudienceParamsResultProps {
  searchFloor: string;
  dataByParams: AxiosResponse<IFreeAudiencePagedResponse>;
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
  searchDatetime: string;
}

export function FreeAudienceParamsResult({
  dataByParams,
  searchFloor,
  page,
  setPage,
  searchDatetime,
}: FreeAudienceParamsResultProps) {
  const { results, next, previous, count } = dataByParams.data;

  const { userData } = useAuth();
  const { createReservation, isPending: isBooking } = useCreateReservation();

  const [bookingTarget, setBookingTarget] = useState<ISelectedBooking | null>(
    null,
  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  const handleOpenBookingModal = (
    audience: { id: number; name: string },
    slot: ISlotData,
  ) => {
    setBookingTarget({ audience, slot });
  };

  const handleConfirmBooking = () => {
    if (!bookingTarget) return;

    createReservation(
      {
        audience: bookingTarget.audience.id,
        date: dayjs(searchDatetime).format("YYYY-MM-DD"),
        slot_start: bookingTarget.slot.number,
        slot_end: bookingTarget.slot.number,
      },
      {
        onSuccess: () => {
          setBookingTarget(null);
        },
      },
    );
  };

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
            <FreeAudienceParamCard
              key={item.audience.id}
              audience={item.audience}
              freeSlots={item.free_slots}
              isUserAuthorized={!!userData}
              onSlotClick={handleOpenBookingModal}
            />
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

      <ConfirmBookingModal
        isOpen={!!bookingTarget}
        onClose={() => setBookingTarget(null)}
        isBooking={isBooking}
        audienceName={bookingTarget?.audience.name || ""}
        selectedSlot={bookingTarget?.slot || null}
        searchDatetime={searchDatetime}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
}
