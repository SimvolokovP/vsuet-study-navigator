"use client";

import { cn } from "@/shared/utils/cn";
import dayjs from "@/shared/utils/dayjs";
import { Fragment, useState, useMemo } from "react";
import { ISubject } from "@/shared/types/subject.model";
import { TIME_SLOTS } from "@/shared/data/date.data";
import { getWeekDays } from "@/shared/helpers/dateHelpers";
import { getFormattedTimeSlot } from "@/shared/helpers/subjectHelpers";
import { getGroupedSubjectsForSlot } from "@/shared/helpers/scheduleHelpers";
import { TypeSchduleType } from "@/features/types/schedule.models";
import { CalendarControl } from "./CalendarControl";
import { CalendarItem } from "./CalendarItem";
import { SubjectInfo } from "./SubjectInfo";
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalHeader,
} from "@/components/ui/modal";

interface ScheduleCalendarProps {
  subjectsList: ISubject[] | undefined;
  selectedDate: string;
  onDateChange: (date: string) => void;
  scheduleType?: TypeSchduleType;
}

export function ScheduleCalendarWrapper({
  subjectsList,
  selectedDate,
  onDateChange,
  scheduleType,
}: ScheduleCalendarProps) {
  const currentWeek = useMemo(
    () => dayjs(selectedDate).startOf("week").add(1, "day"),
    [selectedDate],
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<ISubject[]>();

  const today = dayjs().format("YYYY-MM-DD");
  const weekDays = getWeekDays(currentWeek);

  const handleWeekChange = (newWeek: dayjs.Dayjs) => {
    onDateChange(newWeek.format("YYYY-MM-DD"));
  };

  const handleSubjectClick = (subjects: ISubject[]) => {
    setSelectedSubject(subjects);
    setIsModalOpen(true);
  };

  if (!subjectsList) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <CalendarControl
        currentWeek={currentWeek}
        onWeekChange={handleWeekChange}
      />

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-7 min-w-200">
          <div className="sticky top-0 z-5 p-2"></div>
          {weekDays.map((day) => (
            <div
              key={day.dateString}
              className={cn(
                "sticky top-0 z-5 border-b border-muted/50 p-1 md:p-2 text-center font-medium",
                day.dateString === today ? "border-b-2" : "",
                day.dateString === selectedDate
                  ? "border-b-2"
                  : "",
              )}
            >
              <div className="text-sm md:text-base">{day.name}</div>
              <div className="text-xs md:text-sm">{day.date}</div>
            </div>
          ))}

          {TIME_SLOTS.map((timeSlot) => (
            <Fragment key={`${timeSlot.start_time}-${timeSlot.end_time}`}>
              <div className="sticky left-0 z-0 bg-background border-r border-muted/50 p-1 md:p-2 text-xs md:text-sm text-foreground">
                {getFormattedTimeSlot(timeSlot)}
              </div>

              {weekDays.map((day) => {
                const subjectGroups = getGroupedSubjectsForSlot(
                  subjectsList,
                  day.dateString,
                  timeSlot,
                );
                return (
                  <div
                    key={`${day.dateString}-${timeSlot.start_time}`}
                    className={cn(
                      "flex flex-col gap-1 border-b border-muted/50 border-r p-1 min-h-15 md:min-h-20",
                      day.dateString === today ? "bg-muted/20" : "",
                      day.dateString === selectedDate
                        ? "border-r-2"
                        : "",
                    )}
                  >
                    {subjectGroups.map((subjects, index) => (
                      <CalendarItem
                        handleSubjectClick={handleSubjectClick}
                        scheduleType={scheduleType}
                        key={`${subjects[0].id}-${index}`}
                        subjects={subjects}
                      />
                    ))}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent className="max-w-2xl">
          <ModalHeader>
            <ModalTitle>Информация о занятии</ModalTitle>
          </ModalHeader>
          <div className="p-4">
            <SubjectInfo subjects={selectedSubject} />
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
