"use client";

import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal";

interface NearestAudienceItem {
  audience: {
    id: number;
    name: string;
    floor: number | null;
  };
  free_slots: {
    number: number;
    start_time: string;
  }[];
}

interface NearestAudiencesModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  nearest?: NearestAudienceItem[];
}

export function NearestAudiencesModal({
  isOpen,
  onOpenChange,
  nearest,
}: NearestAudiencesModalProps) {
  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="p-3 md:p-6">
        <ModalTitle className="font-bold text-lg">
          Ближайшие свободные аудитории
        </ModalTitle>
        <div className="max-h-[60vh] overflow-y-auto pr-1 flex flex-col gap-3">
          {!nearest || nearest.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Альтернативных вариантов не найдено
            </p>
          ) : (
            nearest.map((item) => (
              <div
                key={item.audience.id}
                className="p-2 md:p-4 border border-border rounded-xl bg-card"
              >
                <h4 className="font-semibold text-sm md:text-base mb-2">
                  Аудитория {item.audience.name}{" "}
                  {item.audience.floor ? `(Этаж ${item.audience.floor})` : ""}
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
  );
}
