import { ITimeSlot } from "@/shared/types/subject.model";

export const MONTH_NAMES = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const MONTH_NAMES_GENITIVE = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

export const WEEKDAY_NAMES = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export const TIME_SLOTS: ITimeSlot[] = [
  { start_time: "08:00:00", end_time: "09:35:00" },
  { start_time: "09:45:00", end_time: "11:20:00" },
  { start_time: "11:50:00", end_time: "13:25:00" },
  { start_time: "13:35:00", end_time: "15:10:00" },
  { start_time: "15:20:00", end_time: "16:55:00" },
  { start_time: "17:05:00", end_time: "18:40:00" },
  { start_time: "18:50:00", end_time: "20:25:00" },
];
