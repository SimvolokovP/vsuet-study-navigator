"use client";

import { getWeekRange } from "@/shared/helpers/dateHelpers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { scheduleService } from "../services/schedule.service";

export function useTeacherSchedule(selectedDate: string) {
  const { id } = useParams<{ id: string }>();

  const teacherScheduleQuery = useQuery({
    queryKey: ["teacherSchedule", id, getWeekRange(selectedDate, 7).start],
    queryFn: () => {
      const range = getWeekRange(selectedDate, 7);
      return scheduleService.getScheduleByTeacherId(
        +id,
        range.start,
        range.end,
      );
    },
    staleTime: 300000,
    enabled: !!id,
  });

  return {
    teacherScheduleData: teacherScheduleQuery.data,
    isPending: teacherScheduleQuery.isPending,
    error: teacherScheduleQuery.error,
  };
}
