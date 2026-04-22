"use client";

import { getWeekRange } from "@/shared/helpers/dateHelpers";
import { hasAtLeastOneField } from "@/shared/helpers/hasAtLeastOneField";
import { IFilter } from "@/shared/types/filter.model";
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

function filterSubjectsByFilters(
  subjects: ISubject[],
  filters: IFilter,
  startDate: string,
  endDate: string,
): ISubject[] {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const { group, subgroup, teacher, audience } = filters;

  return subjects.filter((subject) => {
    if (group && subject.group.name !== group) return false;

    if (subgroup && subject.subgroup !== 0) {
      if (subject.subgroup.toString() !== subgroup) return false;
    }

    if (teacher) {
      const teacherFullName =
        `${subject.teacher?.last_name} ${subject.teacher?.first_name} ${subject.teacher?.patronymic}`.toLowerCase();
      const teacherLastName = subject.teacher?.last_name.toLowerCase();
      const searchTerm = teacher.toLowerCase();

      const isTeacherMatch =
        teacherFullName.includes(searchTerm) ||
        teacherLastName?.includes(searchTerm);
      if (!isTeacherMatch) return false;
    }

    if (audience) {
      const audienceMatch = subject.audience?.name
        .toLowerCase()
        .includes(audience.toLowerCase());
      if (!audienceMatch) return false;
    }

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

  const uniqueSubjects = new Map();
  result.forEach((subject) => {
    const key = `${subject.id}_${subject.date}_${subject.time_subject.start_time}`;
    if (!uniqueSubjects.has(key)) {
      uniqueSubjects.set(key, subject);
    }
  });

  return Array.from(uniqueSubjects.values()).sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.time_subject.start_time.localeCompare(b.time_subject.start_time);
  });
}

export function useMockSearchedSchedule(
  filtersList: IFilter,
  selectedDate: string,
  searchTriggered: boolean,
) {
  const { group, subgroup, teacher, audience } = filtersList;

  const searchedScheduleQuery = useQuery({
    queryKey: [
      "mockSearchedSchedule",
      group,
      subgroup,
      teacher,
      audience,
      getWeekRange(selectedDate, 7).start,
    ],
    queryFn: () => {
      const range = getWeekRange(selectedDate, 7);

      const filteredSubjects = filterSubjectsByFilters(
        MOCK_SUBJECTS,
        filtersList,
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
