"use client";

import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/shared/components/ui/modal";
import { Button } from "@/shared/components/ui/button";
import { NumberAuthForm } from "./NumberAuthForm";

interface NumberAuthModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function NumberAuthModal({
  trigger,
  open,
  onOpenChange,
  onSuccess,
}: NumberAuthModalProps) {
  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    }
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalTrigger asChild>
        {trigger || <Button variant="primary">Ввести номер зачетки</Button>}
      </ModalTrigger>
      <ModalContent
        className="sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <ModalHeader>
          <ModalTitle>Номер зачетки</ModalTitle>
          <ModalDescription>
            Введите номер вашей зачетки для доступа к расписанию
          </ModalDescription>
        </ModalHeader>
        <div className="px-4 sm:px-6 pb-6">
          <NumberAuthForm onSuccess={handleSuccess} />
        </div>
      </ModalContent>
    </Modal>
  );
}
