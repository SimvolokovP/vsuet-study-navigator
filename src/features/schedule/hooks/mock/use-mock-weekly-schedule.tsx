"use client";

import { getWeekRange } from "@/shared/helpers/dateHelpers";
import { ISubject } from "@/shared/types/subject.model";
import { MOCK_SUBJECTS } from "@/shared/data/mockSubjects.data";
import { useQuery } from "@tanstack/react-query";
import dayjs from "@/shared/utils/dayjs";

function isDateInRange(
  date: string,
  start: dayjs.Dayjs,
  end: dayjs.Dayjs,
): boolean {
  const targetDate = dayjs(date);
  return (
    (targetDate.isAfter(start) || targetDate.isSame(start, "day")) &&
    (targetDate.isBefore(end) || targetDate.isSame(end, "day"))
  );
}

function filterSubjectsByGroupAndDateRange(
  subjects: ISubject[],
  group: string,
  subGroup: string,
  startDate: string,
  endDate: string,
): ISubject[] {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  return subjects.filter((subject) => {
    const isGroupMatch = subject.group.name === group;
    const isSubgroupMatch =
      subject.subgroup === 0 || subject.subgroup.toString() === subGroup;

    if (!isGroupMatch || !isSubgroupMatch) return false;

    const isMainDateInRange = isDateInRange(subject.date, start, end);
    const hasRepeatDateInRange = subject.repeat_dates?.some((repeat) => {
      return isDateInRange(repeat.date, start, end);
    });

    return isMainDateInRange || hasRepeatDateInRange;
  });
}

function transformToScheduleData(
  subjects: ISubject[],
  weekStart: string,
): ISubject[] {
  const result: ISubject[] = [];
  const weekEnd = dayjs(weekStart).add(6, "day");

  for (let i = 0; i < 7; i++) {
    const currentDate = dayjs(weekStart).add(i, "day").format("YYYY-MM-DD");

    const daySubjects = subjects.filter((subject) => {
      const isMainDateMatch =
        dayjs(subject.date).format("YYYY-MM-DD") === currentDate;
      const hasRepeatMatch = subject.repeat_dates?.some(
        (repeat) => dayjs(repeat.date).format("YYYY-MM-DD") === currentDate,
      );
      return isMainDateMatch || hasRepeatMatch;
    });

    daySubjects.forEach((subject) => {
      let dateForSubject = currentDate;

      if (dayjs(subject.date).isBefore(weekStart, "day")) {
        const matchingRepeat = subject.repeat_dates?.find(
          (repeat) => dayjs(repeat.date).format("YYYY-MM-DD") === currentDate,
        );
        if (matchingRepeat) {
          dateForSubject = dayjs(matchingRepeat.date).format("YYYY-MM-DD");
        }
      } else if (dayjs(subject.date).isAfter(weekEnd, "day")) {
        return;
      } else {
        dateForSubject = dayjs(subject.date).format("YYYY-MM-DD");
      }

      result.push({
        ...subject,
        date: dateForSubject,
      });
    });
  }

  return result.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.time_subject.start_time.localeCompare(b.time_subject.start_time);
  });
}

export function useMockWeeklySchedule(
  group: string,
  subGroup: string,
  selectedDate: string,
) {
  const weeklyScheduleQuery = useQuery({
    queryKey: [
      "mockWeeklySchedule",
      group,
      subGroup,
      getWeekRange(selectedDate, 7).start,
    ],
    queryFn: () => {
      const range = getWeekRange(selectedDate, 7);
      const filteredSubjects = filterSubjectsByGroupAndDateRange(
        MOCK_SUBJECTS,
        group,
        subGroup,
        range.start,
        range.end,
      );

      const scheduleData = transformToScheduleData(
        filteredSubjects,
        range.start,
      );

      return Promise.resolve(scheduleData);
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
