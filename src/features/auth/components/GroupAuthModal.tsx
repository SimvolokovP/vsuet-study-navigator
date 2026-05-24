"use client";

import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { GroupAuthForm } from "./GroupAuthForm";
import { ReactNode } from "react";

interface GroupAuthModalProps {
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function GroupAuthModal({
  trigger,
  open,
  onOpenChange,
  onSuccess,
}: GroupAuthModalProps) {
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
        {trigger || <Button variant="primary">Выбрать группу</Button>}
      </ModalTrigger>
      <ModalContent className="sm:max-w-md">
        <ModalHeader>
          <ModalTitle>Выбор группы</ModalTitle>
          <ModalDescription>
            Выберите вашу группу и подгруппу для просмотра расписания
          </ModalDescription>
        </ModalHeader>
        <div className="px-4 sm:px-6 pb-6">
          <GroupAuthForm onSuccess={handleSuccess} />
        </div>
      </ModalContent>
    </Modal>
  );
}
