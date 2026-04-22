import dayjs from "@/shared/utils/dayjs";
import { MONTH_NAMES } from "@/shared/data/date.data";
import { ITimeSlot, ISubject } from "@/shared/types/subject.model";

export interface WeekDay {
  name: string;
  date: number;
  dateString: string;
  isToday: boolean;
  isPast: boolean;
  isWeekend: boolean;
  month: number;
  year: number;
}

export const getWeekDays = (startDate: dayjs.Dayjs): WeekDay[] => {
  const today = dayjs();
  return Array.from({ length: 6 }).map((_, i) => {
    const date = startDate.add(i, "day");
    return {
      name: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][i],
      date: date.date(),
      dateString: date.format("YYYY-MM-DD"),
      isToday: date.isSame(today, "day"),
      isPast: date.isBefore(today, "day"),
      isWeekend: i >= 5,
      month: date.month(),
      year: date.year(),
    };
  });
};

export const getWeekDaysToList = (startDate: dayjs.Dayjs): WeekDay[] => {
  const today = dayjs();
  return Array.from({ length: 6 }).map((_, i) => {
    const date = startDate.add(i, "day");
    return {
      name: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][i],
      date: date.date(),
      dateString: date.format("YYYY-MM-DD"),
      isToday: date.isSame(today, "day"),
      isPast: date.isBefore(today, "day"),
      isWeekend: i >= 5,
      month: date.month(),
      year: date.year(),
    };
  });
};

export const getCurrentMonthYear = (date: dayjs.Dayjs) => ({
  month: MONTH_NAMES[date.month()],
  year: date.year(),
});

export const getWeekType = (date: dayjs.Dayjs): "numerator" | "denominator" => {
  const startDate = dayjs("2025-09-01");
  const weeksDiff = date.diff(startDate, "week");
  return weeksDiff % 2 === 0 ? "numerator" : "denominator";
};

export const getSubjectForSlot = (
  subjectsList: ISubject[],
  date: string,
  timeSlot: ITimeSlot
): ISubject[] => {
  const normalizedDate = dayjs(date).format("YYYY-MM-DD");
  
  return subjectsList.filter((subject) => {
    const subjectDate = subject.date.split('T')[0];
    const isSameDate =
      subjectDate === normalizedDate ||
      subject.repeat_dates.some(
        (rd) => rd.date.split('T')[0] === normalizedDate
      );

    return (
      isSameDate &&
      subject.time_subject.start_time === timeSlot.start_time &&
      subject.time_subject.end_time === timeSlot.end_time
    );
  });
};

export const getWeekRange = (date: string, duration: number = 7) => {
  const startOfWeek = dayjs(date).startOf("week").format("YYYY-MM-DD");
  const endOfThreeWeeks = dayjs(startOfWeek)
    .add(duration, "day")
    .format("YYYY-MM-DD");

  return { start: startOfWeek, end: endOfThreeWeeks };
};