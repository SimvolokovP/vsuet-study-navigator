"use client";

import { TypeSchduleType } from "@/features/types/schedule.models";
import {
  getCurrentLessonInfo,
  getShortTeacherName,
  getTypeShort,
  getTypeStyle,
} from "@/shared/helpers/subjectHelpers";
import { ISubject } from "@/shared/types/subject.model";
import dayjs from "dayjs";

export function CalendarItem({
  subjects,
  scheduleType,
  handleSubjectClick,
}: {
  subjects: ISubject[];
  scheduleType?: TypeSchduleType;
  handleSubjectClick: (subjects: ISubject[]) => void;
}) {
  const baseSubject = subjects[0];

  const currentDateTime = dayjs();

  const { isInProgress } = getCurrentLessonInfo(subjects, currentDateTime);

  return (
    <>
      <div
        onClick={() => handleSubjectClick(subjects)}
        className={`${getTypeStyle(
          baseSubject.type_of_classes
        )} p-1 flex-1 rounded-sm text-xs md:text-sm anim-hover cursor-pointer ${
          isInProgress ? "border-b-2 border-t-2 border-r-2 border-accent" : ""
        }`}
      >
        <div className="font-bold truncate">
          {getTypeShort(baseSubject.type_of_classes)}. {baseSubject.name}
        </div>
        <div className="truncate">
          {scheduleType === "weekly" && (
            <>
              {baseSubject.teacher && (
                <div>{getShortTeacherName(baseSubject.teacher)}</div>
              )}
              {baseSubject.audience && baseSubject.audience.name.length ? (
                <div>Ауд. {baseSubject.audience.name}</div>
              ) : (
                <></>
              )}
            </>
          )}

          {scheduleType === "teacher" && (
            <>
              <div>
                {subjects.length > 1
                  ? `${subjects.map((s) => s.group.name).join(", ")}`
                  : subjects[0].group.name}
              </div>
              {baseSubject.audience && baseSubject.audience.name.length ? (
                <div>Ауд. {baseSubject.audience.name}</div>
              ) : (
                <></>
              )}
            </>
          )}

          {scheduleType === "search" && (
            <>
              {baseSubject.teacher && (
                <div>{getShortTeacherName(baseSubject.teacher)}</div>
              )}

              {baseSubject.audience && baseSubject.audience.name.length ? (
                <div>Ауд. {baseSubject.audience.name}</div>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
