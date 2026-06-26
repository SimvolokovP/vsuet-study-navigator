"use client";

import { getWeekRange } from "@/shared/helpers/dateHelpers";
import { useQuery } from "@tanstack/react-query";
import { scheduleService } from "../services/schedule.service";

export function useWeeklySchedule(
  group: string,
  subGroup: string,
  selectedDate: string,
) {
  const weeklyScheduleQuery = useQuery({
    queryKey: [
      "weeklySchedule",
      group,
      subGroup,
      getWeekRange(selectedDate, 7).start,
    ],
    queryFn: async () => {
      const range = getWeekRange(selectedDate, 7);

      try {
        const data = await scheduleService.getWeeklySchedule(
          group,
          subGroup,
          range.start,
          range.end,
        );
        return data;
      } catch (error) {
        console.log("Network error, trying SW cache...");

        throw error;
      }
    },
    enabled: !!group && !!subGroup,
    retry: 3,
  });

  return {
    weeklyScheduleData: weeklyScheduleQuery.data,
    isPending: weeklyScheduleQuery.isPending,
    error: weeklyScheduleQuery.error,
    isSuccess: weeklyScheduleQuery.isSuccess,
  };
}
