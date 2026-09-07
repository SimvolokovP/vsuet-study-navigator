import {
  getShortTeacherName,
  getTypeStyle,
} from "@/shared/helpers/subjectHelpers";
import { ISubject } from "@/shared/types/subject.model";
import { getTypeIcon } from "@/shared/helpers/getTypeIcon";
import { ReactNode } from "react";

import {
  getGroupNames,
  renderWithSeparators,
} from "@/shared/helpers/renderItemHelpers";
import { TypeSchduleType } from "@/features/schedule/types/schedule.models";
import { RemainingTimeBadge } from "../RemainingTimeBadge";
import Link from "next/link";
import { PAGES } from "@/shared/config/pages-url.config";

export function ScheduleListItem({
  subjects,
  scheduleType,
}: {
  subjects: ISubject[];
  scheduleType?: TypeSchduleType;
}) {
  const baseSubject = subjects[0];

  const renderScheduleInfo = (): (ReactNode | null)[] => {
    switch (scheduleType) {
      case "weekly":
        return [
          baseSubject.teacher ? (
            <Link
              className="hover:underline"
              href={PAGES.SCHEDULE_TEACHER(baseSubject.teacher.id.toString())}
            >
              {getShortTeacherName(baseSubject.teacher)}
            </Link>
          ) : null,
          baseSubject.audience?.name?.length ? (
            <div>Ауд. {baseSubject.audience!.name}</div>
          ) : null,
        ];

      case "teacher":
        return [
          <div key="groups">
            {getGroupNames(subjects)}{" "}
            {baseSubject.subgroup && (
              <span>
                {baseSubject.type_of_classes !== "Лекция" &&
                  baseSubject.subgroup !== 3 &&
                  ` (${baseSubject.subgroup} подгруппа)`}
              </span>
            )}
          </div>,
          baseSubject.audience?.name?.length ? (
            <div key="audience">Ауд. {baseSubject.audience!.name}</div>
          ) : null,
        ];

      case "search":
        return [
          baseSubject.teacher ? (
            <div key="teacher">
              <Link
                className="hover:underline"
                href={PAGES.SCHEDULE_TEACHER(baseSubject.teacher.id.toString())}
              >
                {getShortTeacherName(baseSubject.teacher)}
              </Link>
            </div>
          ) : null,
          <div key="groups">
            {getGroupNames(subjects)}{" "}
            {baseSubject.subgroup && (
              <span>
                {baseSubject.type_of_classes !== "Лекция" &&
                  baseSubject.subgroup !== 3 &&
                  ` (${baseSubject.subgroup} подгруппа)`}
              </span>
            )}
          </div>,
          baseSubject.audience?.name?.length ? (
            <div key="audience">Ауд. {baseSubject.audience!.name}</div>
          ) : null,
        ];

      default:
        return [];
    }
  };

  return (
    <div
      className={`${getTypeStyle(
        baseSubject.type_of_classes,
      )} p-3 rounded-sm relative`}
    >
      <div className="flex items-center justify-between">
        <div className="font-bold flex gap-1 items-center">
          <span>{getTypeIcon(baseSubject.type_of_classes, 18)}</span>
          <span>{baseSubject.type_of_classes}</span>
        </div>
        <RemainingTimeBadge subjects={subjects} isActive />
      </div>
      <div className="font-bold">{baseSubject.name}</div>

      <div className="font-light flex gap-1 items-center flex-wrap">
        {renderWithSeparators(renderScheduleInfo())}
      </div>
    </div>
  );
}
