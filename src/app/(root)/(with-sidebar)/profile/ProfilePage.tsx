"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/Loader";
import { PAGES } from "@/config/pages-url.config";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Layout } from "@/layout/Layout";
import { useUserLocalStorage } from "@/store/use-user-local-storage.store";
import { LogoutConfirm } from "@/widgets/LogoutConfirm";
import { ThemeToggle } from "@/widgets/ThemeToggle";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ProfilePage() {
  const { userInLocalStorage, loadUserFromLocalStorage } =
    useUserLocalStorage();
  const { userData, isPending: isUserPending } = useAuth();
  const [isLocalLoading, setIsLocalLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLocalLoading(true);
      try {
        await loadUserFromLocalStorage();
      } finally {
        setIsLocalLoading(false);
      }
    };
    loadData();
  }, [loadUserFromLocalStorage]);

  const isLoading = isLocalLoading || isUserPending;
  const isAuth = !!userInLocalStorage || !!userData;

  return (
    <Layout title="Профиль">
      <div className="w-full flex justify-center">
        <div className="max-w-170 w-full">
          <div className="bg-card border border-border rounded-xl p-4 anim-hover mb-2 md:mb-4">
            <div className="font-bold text-center text-lg md:text-xl mb-2 md:mb-4">
              Данные пользователя
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader size={32} />
              </div>
            ) : isAuth ? (
              <div className="flex flex-col gap-4 text-base md:text-lg">
                {userData ? (
                  <div className="border-b border-border pb-3">
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
                  </div>
                ) : (
                  <div className="border-b border-border pb-3 bg-muted/30 p-3 rounded-lg flex flex-col gap-1.5">
                    <p className="text-sm text-muted-foreground">
                      Вы используете быстрый вход. Войдите по логину и паролю,
                      чтобы получить доступ к полному функционалу (учебный
                      рейтинг, зачетка).
                    </p>
                    <Link href={`${PAGES.AUTH}?type=credentials`}>
                      <Button variant="default" size="sm">
                        Войти по аккаунту
                      </Button>
                    </Link>
                  </div>
                )}

                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Привязка к расписанию:
                  </div>
                  {userInLocalStorage ? (
                    <div className="flex flex-col gap-1">
                      <div>
                        Группа:{" "}
                        <span className="font-bold">
                          {userInLocalStorage.group}
                        </span>
                      </div>
                      <div>
                        Подгруппа:{" "}
                        <span className="font-bold">
                          {userInLocalStorage.subgroup}
                        </span>
                      </div>
                      <div>
                        Номер зачетки:{" "}
                        <span className="font-bold">
                          {userInLocalStorage.number}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 items-start bg-muted/30 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Группа не привязана. Привяжите её для быстрого
                        отслеживания и вывода студенческого расписания на
                        главной.
                      </p>
                      <Link href={`${PAGES.AUTH}?type=quick`}>
                        <Button variant="default" size="sm">
                          Привязать группу
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="flex justify-center mt-2">
                  <LogoutConfirm>
                    <Button variant="primary">Выйти</Button>
                  </LogoutConfirm>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm md:text-base">
                  Вы не вошли в систему, поэтому мы не смогли найти данные о
                  пользователе.
                </p>
                <Link href={PAGES.AUTH}>
                  <Button variant="primary">Войти</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex justify-center w-full">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </Layout>
  );
}
