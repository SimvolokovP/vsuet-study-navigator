"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/Loader";
import { PAGES } from "@/config/pages-url.config";
import { ScheduleActions } from "@/features/schedule/components/ScheduleActions";
import { ScheduleWrapper } from "@/features/schedule/components/ScheduleWrapper";
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

  const { weeklyScheduleData, error, isPending } = useWeeklySchedule(
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
          <Link href={PAGES.SEARCH_SCHEDULE}>
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
              <Link href={PAGES.SEARCH_SCHEDULE}>
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
        <Link href={PAGES.SEARCH_SCHEDULE}>
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
          dataError={error}
          isDataPending={isPending}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      }
    >
      <ScheduleWrapper
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        viewMode={viewMode}
        data={weeklyScheduleData}
        error={error}
        isPending={isPending}
      />
    </Layout>
  );
}
