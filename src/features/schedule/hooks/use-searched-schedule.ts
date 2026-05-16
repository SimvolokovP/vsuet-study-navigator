"use client";

import { getWeekRange } from "@/shared/helpers/dateHelpers";
import { hasAtLeastOneField } from "@/shared/helpers/hasAtLeastOneField";
import { IFilter } from "@/shared/types/filter.model";
import { useQuery } from "@tanstack/react-query";
import { scheduleService } from "../services/schedule.service";

export function useSearchedSchedule(
  filtersList: IFilter,
  selectedDate: string,
  searchTriggered: boolean,
) {
  const { group, subgroup, teacher, audience } = filtersList;

  const searchedScheduleQuery = useQuery({
    queryKey: [
      "searchedSchedule",
      group,
      subgroup,
      teacher,
      audience,
      getWeekRange(selectedDate, 7).start,
    ],
    queryFn: () => {
      const range = getWeekRange(selectedDate, 7);
      return scheduleService.getScheduleByParams(
        filtersList,
        range.start,
        range.end,
      );
    },
    staleTime: 300000,
    enabled:
      !!selectedDate && hasAtLeastOneField(filtersList) && !!searchTriggered,
  });

  return {
    searchedScheduleData: searchedScheduleQuery.data,
    isPending: searchedScheduleQuery.isPending,
    error: searchedScheduleQuery.error,
    refetch: searchedScheduleQuery.refetch,
  };
}
