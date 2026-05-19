"use client";

import { useUserLocalStorage } from "@/store/use-user-local-storage.store";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { PropsWithChildren } from "react";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { Loader2 } from "lucide-react";

export function LogoutConfirm({ children }: PropsWithChildren) {
  const { clearUserLocalStorage } = useUserLocalStorage();
  const { logout, isPending } = useLogout();

  const handleLogout = () => {
    clearUserLocalStorage();
    logout();
  };

  return (
    <Modal>
      <ModalTrigger asChild>{children}</ModalTrigger>

      <ModalContent className="sm:max-w-106.25 py-4 px-2">
        <ModalHeader>
          <ModalTitle>Уже уходите?</ModalTitle>
        </ModalHeader>

        <div className="flex w-full justify-end items-center gap-3 pt-4">
          <Button
            disabled={isPending}
            variant="destructive"
            onClick={handleLogout}
          >
            {isPending ? <Loader2 /> : "Выйти"}
          </Button>
          <ModalClose asChild>
            <Button disabled={isPending} variant="default" type="button">
              Отмена
            </Button>
          </ModalClose>
        </div>
      </ModalContent>
    </Modal>
  );
}
