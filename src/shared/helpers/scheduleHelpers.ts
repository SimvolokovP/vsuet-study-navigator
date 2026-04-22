import { ISubject } from "@/shared/types/subject.model";
import dayjs from "@/shared/utils/dayjs";
import { getSubjectForSlot } from "./dateHelpers";

export const isSubjectOnDate = (subject: ISubject, date: string) => {
  const targetDate = date;
  
  const subjectDate = subject.date.split('T')[0];
  if (subjectDate === targetDate) return true;
  
  return subject.repeat_dates.some(
    (repeat) => repeat.date.split('T')[0] === targetDate
  );
};

export const getGroupedSubjects = (
  subjectsList?: ISubject[],
  selectedDate?: string
) => {
  if (!subjectsList || !selectedDate) return [];

  const normalizedDate = dayjs(selectedDate).format("YYYY-MM-DD");

  const filteredSubjects = subjectsList.filter((subject) =>
    isSubjectOnDate(subject, normalizedDate)
  );

  const grouped: Record<string, ISubject[]> = {};

  filteredSubjects.forEach((subject) => {
    const key = `${subject.name}_${subject?.teacher?.id}_${subject.time_subject.start_time}_${subject.time_subject.end_time}_${subject.type_of_classes}`;

    if (!grouped[key]) {
      grouped[key] = [subject];
    } else {
      grouped[key].push(subject);
    }
  });

  return Object.values(grouped).sort((a, b) => {
    if (a[0].time_subject.start_time < b[0].time_subject.start_time) return -1;
    if (a[0].time_subject.start_time > b[0].time_subject.start_time) return 1;
    return 0;
  });
};

export const getGroupedSubjectsForSlot = (
  subjects: ISubject[],
  date: string,
  timeSlot: { start_time: string; end_time: string }
) => {
  const filteredSubjects = getSubjectForSlot(subjects, date, timeSlot);

  const grouped: Record<string, ISubject[]> = {};

  filteredSubjects.forEach((subject) => {
    const key = `${subject.name}_${subject?.teacher?.id}_${subject.time_subject.start_time}_${subject.time_subject.end_time}_${subject.type_of_classes}`;

    if (!grouped[key]) {
      grouped[key] = [subject];
    } else {
      grouped[key].push(subject);
    }
  });

  return Object.values(grouped);
};
