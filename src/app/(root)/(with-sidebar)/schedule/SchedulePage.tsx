"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/Loader";
import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal";
import { PAGES } from "@/config/pages-url.config";
import { ScheduleActions } from "@/features/schedule/components/ScheduleActions";
import { ScheduleWrapper } from "@/features/schedule/components/ScheduleWrapper";
import { useMockWeeklySchedule } from "@/features/schedule/hooks/mock/use-mock-weekly-schedule";
import { useWeeklySchedule } from "@/features/schedule/hooks/use-weekly-schedule";
import { TypeViewMode } from "@/features/types/schedule.models";
import { Layout } from "@/layout/Layout";
import { useUserLocalStorage } from "@/store/use-user-local-storage.store";
import { ErrorMessage } from "@/widgets/ErrorMessage";
import dayjs from "dayjs";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SchedulePage() {
  const { userInLocalStorage, loadUserFromLocalStorage } =
    useUserLocalStorage();
  const [viewMode, setViewMode] = useState<TypeViewMode>("list");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD"),
  );

  // const { weeklyScheduleData, error, isPending } = useWeeklySchedule(
  //   userInLocalStorage?.group || "",
  //   userInLocalStorage?.subgroup || "",
  //   selectedDate,
  // );

  const { weeklyScheduleData, error, isPending } = useMockWeeklySchedule(
    userInLocalStorage?.group || "",
    userInLocalStorage?.subgroup || "",
    selectedDate,
  );

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

  if (isLoading) {
    return (
      <Layout title="Расписание">
        <div className="h-50 flex items-center justify-center">
          <Loader size={32} />
        </div>
      </Layout>
    );
  }

  if (!userInLocalStorage) {
    return (
      <Layout
        title="Расписание"
        rightButton={
          <Link href={PAGES.SEARCH}>
            <Button className="block md:hidden" variant={"default"} size={"sm"}>
              <Search size={20} />
            </Button>
            <Button variant={"default"} className="hidden md:block">
              <Search size={24} />
            </Button>
          </Link>
        }
      >
        <div className="w-full flex justify-center">
          <div className="max-w-170">
            <ErrorMessage
              text="Вы не вошли в систему, поэтому мы не смогли найти данные о расписании."
              error={{
                message: "Нет данных пользователя",
                name: "Нет данных пользователя",
              }}
            />

            <div className="flex justify-center items-center gap-4 mt-2 md:mt-4">
              <Link href={PAGES.AUTH}>
                <Button variant="primary">Вход в систему</Button>
              </Link>
              <Link href={PAGES.SEARCH}>
                <Button>Поиск расписания</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Расписание"
      rightButton={
        <Link href={PAGES.SEARCH}>
          <Button className="block md:hidden" variant={"default"} size={"sm"}>
            <Search size={20} />
          </Button>
          <Button variant={"default"} className="hidden md:block">
            <Search size={24} />
          </Button>
        </Link>
      }
      actions={
        <ScheduleActions
          dataError={null}
          isDataPending={false}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      }
    >
      <Modal defaultOpen>
        <ModalContent className="p-4">
          <ModalTitle>Демо версия</ModalTitle>
          <div className="space-y-4">
            <p className="text-muted-foreground"> 
              Это{" "}
              <span className="font-semibold text-foreground">
                демонстрационная версия
              </span>{" "}
              приложения, работающая полностью на мок-данных.
            </p>

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                ⚠️ Важно:
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Бэкенд отключен. Все данные — моковые, созданные для
                демонстрации функционала. Изменения не сохраняются, но вы можете
                полноценно ознакомиться со всеми возможностями приложения.
              </p>
            </div>
          </div>
        </ModalContent>
      </Modal>
      <div>
        <ScheduleWrapper
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          viewMode={viewMode}
          data={weeklyScheduleData}
          error={error}
          isPending={isPending}
        />
      </div>
    </Layout>
  );
}
