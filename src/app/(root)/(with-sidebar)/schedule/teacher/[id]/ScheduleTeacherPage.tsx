"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ScheduleActions } from "@/features/schedule/components/ScheduleActions";
import { ScheduleWrapper } from "@/features/schedule/components/ScheduleWrapper";
import { useTeacherSchedule } from "@/features/schedule/hooks/use-teacher-schedule";
import { TypeViewMode } from "@/features/types/schedule.models";
import { Layout } from "@/layout/Layout";
import dayjs from "dayjs";
import { useState } from "react";

export function ScheduleTeacherPage() {
  const [viewMode, setViewMode] = useState<TypeViewMode>("list");

  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD"),
  );

  const { teacherScheduleData, error, isPending } =
    useTeacherSchedule(selectedDate);

  const getTeacherName = () => {
    if (!teacherScheduleData?.data)
      return <Skeleton className="w-37.5 h-8.75" />;

    const { last_name, first_name, patronymic } = teacherScheduleData.data;
    return `${last_name} ${first_name?.[0] || ""}. ${patronymic?.[0] || ""}.`;
  };

  return (
    <Layout
      withBackButton
      title={!!error ? "Ошибка" : getTeacherName()}
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
        scheduleType="teacher"
        viewMode={viewMode}
        data={teacherScheduleData?.data.subjects}
        error={error}
        isPending={isPending}
      />
    </Layout>
  );
}
