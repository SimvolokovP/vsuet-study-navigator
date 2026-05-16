import dayjs from "dayjs";
import { ITimeSlot } from "../types/subject.model";

export const getClosestTimeSlot = (slots: ITimeSlot[]): string => {
  const now = dayjs();
  const todayStr = now.format("YYYY-MM-DD");
  
  let closestSlot = slots[0].start_time;
  let minDifference = Infinity;

  slots.forEach((slot) => {
    const slotStart = dayjs(`${todayStr} ${slot.start_time}`);
    const diff = Math.abs(now.diff(slotStart, "minute"));

    if (diff < minDifference) {
      minDifference = diff;
      closestSlot = slot.start_time;
    }
  });

  return closestSlot;
};
