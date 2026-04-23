"use client";

import dayjs from "@/shared/utils/dayjs";
import { ISubject } from "@/shared/types/subject.model";
import { getFormattedTimeSlot } from "@/shared/helpers/subjectHelpers";
import { useCallback } from "react";
import { getGroupedSubjects } from "@/shared/helpers/scheduleHelpers";
import { TypeSchduleType } from "@/features/types/schedule.models";
import { WeekDays } from "./WeekDays";
import { Divider } from "@/components/ui/divider";
import { ScheduleListItem } from "./ScheduleListItem";
import { Swipable } from "@/components/ui/Swipable";

interface ScheduleListWrapperProps {
  subjectsList: ISubject[] | undefined;
  selectedDate: string;
  onDateChange: (date: string) => void;
  scheduleType?: TypeSchduleType;
}

export function ScheduleListWrapper({
  subjectsList,
  selectedDate,
  onDateChange,
  scheduleType,
}: ScheduleListWrapperProps) {
  const handleSwipeLeft = useCallback(() => {
    onDateChange(dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD"));
  }, [selectedDate, onDateChange]);

  const handleSwipeRight = useCallback(() => {
    onDateChange(dayjs(selectedDate).subtract(1, "day").format("YYYY-MM-DD"));
  }, [selectedDate, onDateChange]);

  const groupedSubjects = getGroupedSubjects(subjectsList, selectedDate);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="max-w-170 w-full">
        <WeekDays selectedDate={selectedDate} onDateChange={onDateChange} />

        {groupedSubjects && groupedSubjects.length > 0 && (
          <div className="text-foreground text-center text-sm md:text-base">
            <span>{groupedSubjects.length}</span>{" "}
            <span>
              {groupedSubjects.length > 1
                ? groupedSubjects.length > 4
                  ? "пар"
                  : "пары"
                : "пара"}
            </span>
          </div>
        )}

        <Swipable
          swipeKey={selectedDate}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          className="w-full"
        >
          {groupedSubjects.length > 0 ? (
            <ul className="w-full flex flex-col gap-4 mt-4">
              {groupedSubjects.map((subjectGroup, index) => (
                <li key={index}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-foreground text-sm md:text-base">
                      {getFormattedTimeSlot({
                        start_time: subjectGroup[0].time_subject.start_time,
                        end_time: subjectGroup[0].time_subject.end_time,
                      })}
                    </div>
                    <Divider className="flex-1 bg-divider" />
                  </div>
                  <ScheduleListItem
                    scheduleType={scheduleType}
                    subjects={subjectGroup}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 text-center text-foreground min-h-72.5">
              Занятий на выбранную дату нет &#127881;
            </div>
          )}
        </Swipable>
      </div>
    </div>
  );
}
