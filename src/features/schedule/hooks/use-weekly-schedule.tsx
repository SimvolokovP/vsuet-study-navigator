"use client";

import { getWeekRange } from "@/shared/helpers/dateHelpers";
import { useQuery } from "@tanstack/react-query";
import { weeklyScheduleService } from "../services/weekly-schedule.service";

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
    queryFn: () => {
      const range = getWeekRange(selectedDate, 7);
      return weeklyScheduleService.get(group, subGroup, range.start, range.end);
    },

    staleTime: 300000,
    enabled: !!group && !!subGroup,
  });

  return {
    weeklyScheduleData: weeklyScheduleQuery.data,
    isPending: weeklyScheduleQuery.isPending,
    error: weeklyScheduleQuery.error,
    isSuccess: weeklyScheduleQuery.isSuccess,
  };
}
