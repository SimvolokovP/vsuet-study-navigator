"use client";

import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalClose,
  ModalTrigger,
} from "@/components/ui/modal";
import { Trash2 } from "lucide-react";

interface ConfirmDeleteModalProps {
  isDeleting: boolean;
  onConfirm: () => void;
  audienceName: string;
  dateStr: string;
  timeStr: string;
}

export function ConfirmDeleteReservationModal({
  isDeleting,
  onConfirm,
  audienceName,
  dateStr,
  timeStr,
}: ConfirmDeleteModalProps) {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button
          disabled={isDeleting}
          variant="destructive"
          size="sm"
          className="flex items-center gap-1.5"
        >
          <Trash2 size={16} />
          {isDeleting ? "Отмена..." : "Отменить бронь"}
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-106.25 py-4 px-4">
        <ModalTitle className="font-bold text-lg mb-2">
          Отмена бронирования
        </ModalTitle>

        <div className="text-sm md:text-base flex flex-col gap-1 text-muted-foreground mb-4">
          <p>Вы действительно хотите отменить бронь для аудитории?</p>
          <div className="text-foreground font-semibold mt-1">
            {audienceName}
          </div>
          <div className="text-foreground font-semibold">Дата: {dateStr}</div>
          <div className="text-foreground font-semibold">Время: {timeStr}</div>
        </div>

        <div className="flex w-full justify-end items-center gap-3">
          <Button
            disabled={isDeleting}
            variant="destructive"
            onClick={onConfirm}
          >
            {isDeleting ? "Отмена..." : "Да, отменить"}
          </Button>
          <ModalClose asChild>
            <Button disabled={isDeleting} variant="default" type="button">
              Нет, назад
            </Button>
          </ModalClose>
        </div>
      </ModalContent>
    </Modal>
  );
}
