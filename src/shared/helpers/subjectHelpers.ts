import { ISubject, ITeacher, ITimeSlot } from "@/shared/types/subject.model";
import dayjs from "dayjs";

export function getLessonStartDateTime(subject: ISubject, baseDate?: string): dayjs.Dayjs {
  const date = baseDate || subject.date;
  return dayjs(`${date} ${subject.time_subject.start_time}`);
}

export function getLessonEndDateTime(subject: ISubject, baseDate?: string): dayjs.Dayjs {
  const date = baseDate || subject.date;
  return dayjs(`${date} ${subject.time_subject.end_time}`);
}

export function getRepeatLessonDateTime(repeatDate: string, subject: ISubject): {
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
} {
  const repeatDateTime = dayjs(repeatDate);
  const start = repeatDateTime
    .set('hour', getLessonStartDateTime(subject).hour())
    .set('minute', getLessonStartDateTime(subject).minute());
  
  const end = repeatDateTime
    .set('hour', getLessonEndDateTime(subject).hour())
    .set('minute', getLessonEndDateTime(subject).minute());

  return { start, end };
}

export function isTimeInLessonInterval(
  currentDateTime: dayjs.Dayjs,
  lessonStart: dayjs.Dayjs,
  lessonEnd: dayjs.Dayjs
): boolean {
  return currentDateTime.isAfter(lessonStart) && currentDateTime.isBefore(lessonEnd);
}

export const getTypeShort = (type: string) => {
  switch (type) {
    case "Лекция":
      return "лек";
    case "Практическое занятие":
      return "пр";
    case "Лабораторное занятие":
      return "лаб";
    default:
      return type.charAt(0);
  }
};

export const getTypeStyle = (type: string) => {
  switch (type.toLowerCase()) {
    case "лекция":
      return "lecture";
    case "практическое занятие":
      return "practice";
    case "лабораторное занятие":
      return "lab";
    default:
      return type.charAt(0);
  }
};

export const getShortTeacherName = (teacher: ITeacher) => {
  const name = `${teacher.first_name[0]}.`;
  const patronymic = `${teacher.patronymic[0]}.`;
  return `${teacher.last_name} ${name} ${patronymic}`;
};

export const getFormattedTimeSlot = (timeSlot: ITimeSlot) => {
  return `${timeSlot.start_time
    .slice(0, 5)
    .replace(":", ".")}-${timeSlot.end_time.slice(0, 5).replace(":", ".")}`;
};

export function isLessonInProgress(
  subject: ISubject,
  currentDateTime: dayjs.Dayjs
): boolean {
  const mainLessonStart = getLessonStartDateTime(subject);
  const mainLessonEnd = getLessonEndDateTime(subject);
  
  const isMainDateInProgress = isTimeInLessonInterval(
    currentDateTime,
    mainLessonStart,
    mainLessonEnd
  );

  const isRepeatDateInProgress = subject.repeat_dates?.some((repeatDate) => {
    const { start: lessonStart, end: lessonEnd } = getRepeatLessonDateTime(
      repeatDate.date,
      subject
    );
    return isTimeInLessonInterval(currentDateTime, lessonStart, lessonEnd);
  });

  return isMainDateInProgress || isRepeatDateInProgress;
}

export function findCurrentSubject(
  subjects: ISubject[],
  currentDateTime: dayjs.Dayjs
): ISubject | null {
  return (
    subjects.find((subject) => isLessonInProgress(subject, currentDateTime)) ||
    null
  );
}

export function getLessonEndTime(
  subject: ISubject,
  currentDateTime: dayjs.Dayjs
): dayjs.Dayjs | null {
  const activeRepeatDate = subject.repeat_dates?.find((repeatDate) => {
    const { start: lessonStart, end: lessonEnd } = getRepeatLessonDateTime(
      repeatDate.date,
      subject
    );
    return isTimeInLessonInterval(currentDateTime, lessonStart, lessonEnd);
  });

  if (activeRepeatDate) {
    const { end: lessonEnd } = getRepeatLessonDateTime(activeRepeatDate.date, subject);
    return lessonEnd;
  }

  const mainLessonStart = getLessonStartDateTime(subject);
  const mainLessonEnd = getLessonEndDateTime(subject);

  if (isTimeInLessonInterval(currentDateTime, mainLessonStart, mainLessonEnd)) {
    return mainLessonEnd;
  }

  return null;
}

export function getRemainingTimeFormatted(
  lessonEnd: dayjs.Dayjs,
  currentDateTime: dayjs.Dayjs
): string {
  const remainingMinutes = lessonEnd.diff(currentDateTime, "minute");

  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  if (hours > 0) {
    return `${hours}ч ${minutes}м`;
  }
  return `${minutes}м`;
}

export function getCurrentLessonInfo(
  subjects: ISubject[],
  currentDateTime: dayjs.Dayjs
) {
  const currentSubject = findCurrentSubject(subjects, currentDateTime);

  if (!currentSubject) {
    return {
      isInProgress: false,
      remainingTime: null,
      currentSubject: null,
    };
  }

  const lessonEnd = getLessonEndTime(currentSubject, currentDateTime);

  if (!lessonEnd) {
    return {
      isInProgress: false,
      remainingTime: null,
      currentSubject: null,
    };
  }

  const remainingTime = getRemainingTimeFormatted(lessonEnd, currentDateTime);

  return {
    isInProgress: true,
    remainingTime,
    currentSubject,
  };
}