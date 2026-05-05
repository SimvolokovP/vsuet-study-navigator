"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/Loader";
import { PAGES } from "@/config/pages-url.config";
import { Layout } from "@/layout/Layout";
import { useUserLocalStorage } from "@/store/use-user-local-storage.store";
import { LogoutConfirm } from "@/widgets/LogoutConfirm";
import { ThemeToggle } from "@/widgets/ThemeToggle";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ProfilePage() {
  const {
    userInLocalStorage,

    loadUserFromLocalStorage,
  } = useUserLocalStorage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await loadUserFromLocalStorage();
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [loadUserFromLocalStorage]);

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
            ) : userInLocalStorage ? (
              <div className="flex flex-col gap-2 text-base md:text-lg">
                <div>
                  <span>Группа:</span>{" "}
                  <span className="font-bold">{userInLocalStorage.group}</span>
                </div>
                <div>
                  <span>Подгруппа:</span>{" "}
                  <span className="font-bold">
                    {userInLocalStorage.subgroup}
                  </span>
                </div>
                <div>
                  <span>Номер зачетки:</span>{" "}
                  <span className="font-bold">{userInLocalStorage.number}</span>
                </div>
                <div className="flex justify-center">
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
