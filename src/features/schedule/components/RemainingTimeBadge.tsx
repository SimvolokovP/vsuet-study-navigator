"use client";

import { getCurrentLessonInfo } from "@/shared/helpers/subjectHelpers";
import { ISubject } from "@/shared/types/subject.model";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export function RemainingTimeBadge({
  subjects,
  isActive = false,
}: {
  subjects: ISubject[];
  isActive?: boolean;
}) {
  const [currentDateTime, setCurrentDateTime] = useState(dayjs());

  const { isInProgress, remainingTime } = getCurrentLessonInfo(
    subjects,
    currentDateTime,
  );

  useEffect(() => {
    if (!isActive || !isInProgress) return;

    const updateTime = () => {
      setCurrentDateTime(dayjs());
    };

    updateTime();

    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, [isActive, isInProgress]); 

  if (!isInProgress) return null;

  return (
    <div className="bg-accent mb-1 text-white text-xs px-2 py-1 rounded-md font-semibold">
      {remainingTime}
    </div>
  );
}
