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

        if (!navigator.onLine) {
          const cachedData = await getFromServiceWorkerCache(
            group,
            subGroup,
            range.start,
            range.end,
          );

          if (cachedData) {
            console.log("Returning cached data from SW");
            return cachedData;
          }
        }

        throw error;
      }
    },
    enabled: !!group && !!subGroup,
  });

  return {
    weeklyScheduleData: weeklyScheduleQuery.data,
    isPending: weeklyScheduleQuery.isPending,
    error: weeklyScheduleQuery.error,
    isSuccess: weeklyScheduleQuery.isSuccess,
  };
}

async function getFromServiceWorkerCache(
  group: string,
  subGroup: string,
  startDate: string,
  endDate: string,
) {
  try {
    const url = `/api/schedule/weekly?group=${encodeURIComponent(group)}&subgroup=${encodeURIComponent(subGroup)}&start=${startDate}&end=${endDate}`;

    const cache = await caches.open("api-data-v1.0.3");
    const cachedResponse = await cache.match(url);

    if (cachedResponse && cachedResponse.ok) {
      const data = await cachedResponse.json();
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error reading from SW cache:", error);
    return null;
  }
}
