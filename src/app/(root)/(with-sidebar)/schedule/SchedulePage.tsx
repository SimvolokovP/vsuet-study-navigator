"use client";

import { Button } from "@/components/ui/button";
import { PAGES } from "@/config/pages-url.config";
import { GroupAuthModal } from "@/features/auth/components/GroupAuthModal";
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
import { useState } from "react";

export function SchedulePage() {
  const { userInLocalStorage } = useUserLocalStorage();
  const [viewMode, setViewMode] = useState<TypeViewMode>("list");

  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD"),
  );

  const { weeklyScheduleData, error, isPending } = useWeeklySchedule(
    userInLocalStorage?.group || "",
    userInLocalStorage?.subgroup || "",
    selectedDate,
  );

  if (!userInLocalStorage?.group) {
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
              text="В системе нет сохраненной информации о группе"
              error={{
                message: "Нет данных об учебной группе",
                name: "Нет данных об учебной группе",
              }}
            />

            <div className="flex justify-center items-center gap-4 mt-2 md:mt-4">
              <GroupAuthModal />
              <Link href={PAGES.SEARCH_SCHEDULE}>
                <Button>Поиск расписания по фильтрам</Button>
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
        <div className="flex w-full justify-end gap-2 items-start">
          <GroupAuthModal
            trigger={
              <Button
                disabled={isPending || !!error}
                size={"sm"}
                className="md:h-9"
              >
                {userInLocalStorage.group} ({userInLocalStorage.subgroup})
              </Button>
            }
          />
          <ScheduleActions
            dataError={error}
            isDataPending={isPending}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
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
