"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalClose,
} from "@/shared/components/ui/modal";
import dayjs from "dayjs";

interface ConfirmBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  isBooking: boolean;
  audienceName: string;
  floor?: number | null;
  selectedSlot: {
    number: number;
    start_time: string;
    end_time: string;
  } | null;
  searchDatetime: string;
  onConfirm: () => void;
}

export function ConfirmBookingModal({
  isOpen,
  onClose,
  isBooking,
  audienceName,
  floor,
  selectedSlot,
  searchDatetime,
  onConfirm,
}: ConfirmBookingModalProps) {
  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <ModalContent className="sm:max-w-106.25 py-4 px-4">
        <ModalTitle className="font-bold text-lg mb-2">
          Подтверждение бронирования
        </ModalTitle>
        {selectedSlot && (
          <div className="text-sm md:text-base flex flex-col gap-1 text-muted-foreground mb-4">
            <p>Вы собираетесь забронировать аудиторию:</p>
            <div className="text-foreground font-semibold mt-1">
              {audienceName} {floor ? `(${floor} этаж)` : ""}
            </div>
            <div className="text-foreground font-semibold">
              Пара {selectedSlot.number}: {selectedSlot.start_time.slice(0, 5)}{" "}
              - {selectedSlot.end_time.slice(0, 5)}
            </div>
            <div className="text-foreground font-semibold">
              Дата: {dayjs(searchDatetime).format("DD.MM.YYYY")}
            </div>
          </div>
        )}
        <div className="flex w-full justify-end items-center gap-3">
          <Button disabled={isBooking} variant="primary" onClick={onConfirm}>
            {isBooking ? "Бронирование..." : "Подтвердить"}
          </Button>
          <ModalClose asChild>
            <Button disabled={isBooking} variant="default" type="button">
              Отмена
            </Button>
          </ModalClose>
        </div>
      </ModalContent>
    </Modal>
  );
}
