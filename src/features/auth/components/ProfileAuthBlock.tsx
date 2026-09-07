"use client";

import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { PAGES } from "@/shared/config/pages-url.config";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { LogoutConfirm } from "@/widgets/LogoutConfirm";
import Link from "next/link";

interface AccountAuthBlockProps {
  isLoading: boolean;
}

export function ProfileAuthBlock({ isLoading }: AccountAuthBlockProps) {
  const { userData, isPending: isUserPending } = useAuth();
  const isAuthLoading = isLoading || isUserPending;

  if (isAuthLoading) {
    return <Skeleton className="w-full h-32.5" />;
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 anim-hover">
      <div className="font-bold text-center text-lg md:text-xl mb-2 md:mb-4">
        Личный кабинет
      </div>

      {userData ? (
        <div className="flex flex-col gap-3 text-base md:text-lg">
          <div>
            Роль:{" "}
            <span className="font-bold">
              {userData.role === "teacher"
                ? "Преподаватель"
                : userData.role === "student"
                  ? "Студент"
                  : "Неизвестно"}
            </span>
          </div>

          {userData.role !== "unknown" && userData.data && (
            <div>
              ФИО:{" "}
              <span className="font-bold">
                {userData.data.last_name} {userData.data.first_name}.{" "}
                {userData.data.patronymic}.
              </span>
            </div>
          )}

          <div className="flex gap-2 justify-center mt-2 flex-wrap">
            <Link href={PAGES.RESERVATIONS}>
              <Button>Заброннированные аудитории</Button>
            </Link>
            <LogoutConfirm>
              <Button variant="destructive">Выйти из аккаунта</Button>
            </LogoutConfirm>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-2">
          <p className="text-sm md:text-base text-muted-foreground text-center">
            Вы не авторизованы в системе. Войдите в аккаунт для получения
            полного доступа.
          </p>
          <Link href={`${PAGES.AUTH}?type=credentials`}>
            <Button variant="primary">Войти по аккаунту</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
