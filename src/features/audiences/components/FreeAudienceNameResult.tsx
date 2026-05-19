"use client";

import { useState } from "react";
import { IFreeAudienceDetailResponse } from "@/shared/types/subject.model";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useRouter } from "next/navigation";
import { PAGES } from "@/config/pages-url.config";

import { AudienceStatusCard } from "./AudienceStatusCard";
import { FreeSlotRow } from "./FreeSlotRow";
import { NearestAudiencesModal } from "./NearestAudiencesModal";
import { ConfirmBookingModal } from "./ConfirmBookingModal";
import { useCreateReservation } from "../hooks/use-create-reservation";

dayjs.extend(isBetween);

interface IFreeSlotDetail {
  number: number;
  start_time: string;
  end_time: string;
}

interface FreeAudienceNameResultProps {
  dataByName: AxiosResponse<IFreeAudienceDetailResponse>;
  searchDatetime: string;
}

export function FreeAudienceNameResult({
  dataByName,
  searchDatetime,
}: FreeAudienceNameResultProps) {
  const [isNearestOpen, setIsNearestOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<IFreeSlotDetail | null>(
    null,
  );

  const { userData } = useAuth();
  const { createReservation, isPending: isBooking } = useCreateReservation();
  const router = useRouter();

  const searchTimeStr = dayjs(searchDatetime).format("HH:mm");
  const baseDate = "2000-01-01";
  const targetTime = dayjs(`${baseDate} ${searchTimeStr}`);

  const audience = dataByName.data.audience;
  const freeSlots = dataByName.data.free_slots;

  const isTargetSlotFree = freeSlots.some((slot) => {
    const startClean = slot.start_time.slice(0, 5);
    const endClean = slot.end_time.slice(0, 5);
    const start = dayjs(`${baseDate} ${startClean}`);
    const end = dayjs(`${baseDate} ${endClean}`);
    return targetTime.isBetween(start, end, null, "[]");
  });

  const handleConfirmBooking = () => {
    if (!selectedSlot) return;

    createReservation(
      {
        audience: audience.id,
        date: dayjs(searchDatetime).format("YYYY-MM-DD"),
        slot_start: selectedSlot.number,
        slot_end: selectedSlot.number,
      },
      {
        onSuccess: () => {
          setSelectedSlot(null);
          router.push(PAGES.PROFILE);
        },
      },
    );
  };

  return (
    <div className="w-full">
      <AudienceStatusCard
        audienceName={audience.name}
        floor={audience.floor}
        isTargetSlotFree={isTargetSlotFree}
        searchTimeStr={searchTimeStr}
        onOpenNearest={() => setIsNearestOpen(true)}
      />

      <p className="text-sm md:text-lg mb-2 md:mb-4 font-bold text-center">
        Все доступные свободные слоты на этот день:
      </p>

      <div className="flex flex-col gap-2 md:gap-3">
        {freeSlots.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-4 bg-muted/10 rounded-xl border border-dashed">
            Нет свободных слотов на весь день
          </div>
        ) : (
          freeSlots.map((slot) => {
            const startTimeFormatted = slot.start_time.slice(0, 5);
            const endTimeFormatted = slot.end_time.slice(0, 5);

            const isThisSlotCurrent = targetTime.isBetween(
              dayjs(`${baseDate} ${startTimeFormatted}`),
              dayjs(`${baseDate} ${endTimeFormatted}`),
              null,
              "[]",
            );

            return (
              <FreeSlotRow
                key={slot.number}
                number={slot.number}
                startTimeFormatted={startTimeFormatted}
                endTimeFormatted={endTimeFormatted}
                isThisSlotCurrent={isThisSlotCurrent}
                showBookingButton={!!userData}
                onBookClick={() => setSelectedSlot(slot)}
              />
            );
          })
        )}
      </div>

      <NearestAudiencesModal
        isOpen={isNearestOpen}
        onOpenChange={setIsNearestOpen}
        nearest={dataByName.data.nearest}
      />

      <ConfirmBookingModal
        isOpen={!!selectedSlot}
        onClose={() => setSelectedSlot(null)}
        isBooking={isBooking}
        audienceName={audience.name}
        floor={audience.floor}
        selectedSlot={selectedSlot}
        searchDatetime={searchDatetime}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
}
