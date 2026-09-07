"use client";

import dayjs from "dayjs";
import { CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/utils/cn";

import "dayjs/locale/ru";
import { useEffect, useMemo, useRef, useState } from "react";
import { TIME_SLOTS } from "@/shared/data/date.data";
dayjs.locale("ru");

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: { message?: string };
  useTimeSlots?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  label,
  error,
  useTimeSlots = false,
}: DateTimePickerProps) {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const currentDatetime = value ? dayjs(value) : dayjs();
  const selectedHour = currentDatetime.hour();
  const selectedMinute = currentDatetime.minute();

  const [currentMonth, setCurrentMonth] = useState(currentDatetime);

  const startOfMonth = currentMonth.startOf("month");
  const daysInMonth = currentMonth.daysInMonth();
  const startDayOfWeek = (startOfMonth.day() + 6) % 7;

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanksArray = Array.from({ length: startDayOfWeek }, (_, i) => i);

  const hourRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const minuteRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const availableHours = useMemo(() => {
    if (!useTimeSlots) return Array.from({ length: 24 }, (_, i) => i);
    const hours = TIME_SLOTS.map((slot) =>
      parseInt(slot.start_time.split(":")[0]),
    );
    return Array.from(new Set(hours)).sort((a, b) => a - b);
  }, [useTimeSlots]);

  const availableMinutesForHour = useMemo(() => {
    if (!useTimeSlots) return Array.from({ length: 60 }, (_, i) => i);
    const minutes = TIME_SLOTS.filter(
      (slot) => parseInt(slot.start_time.split(":")[0]) === selectedHour,
    ).map((slot) => parseInt(slot.start_time.split(":")[1]));
    return Array.from(new Set(minutes)).sort((a, b) => a - b);
  }, [useTimeSlots, selectedHour]);

  useEffect(() => {
    if (openTime) {
      setTimeout(() => {
        hourRefs.current[selectedHour]?.scrollIntoView({
          block: "center",
          behavior: "auto",
        });
        minuteRefs.current[selectedMinute]?.scrollIntoView({
          block: "center",
          behavior: "auto",
        });
      }, 50);
    }
  }, [openTime, selectedHour, selectedMinute]);

  const handleDateSelect = (day: number) => {
    const updatedDatetime = currentMonth
      .date(day)
      .hour(selectedHour)
      .minute(selectedMinute)
      .format("YYYY-MM-DDTHH:mm");

    onChange(updatedDatetime);
    setOpenCalendar(false);
  };

  const handleHourSelect = (hour: number) => {
    let updatedDatetime = currentDatetime.hour(hour);

    if (useTimeSlots) {
      const firstAvailableMin =
        TIME_SLOTS.filter(
          (slot) => parseInt(slot.start_time.split(":")[0]) === hour,
        ).map((slot) => parseInt(slot.start_time.split(":")[1]))[0] ?? 0;

      updatedDatetime = updatedDatetime.minute(firstAvailableMin);
    }

    onChange(updatedDatetime.format("YYYY-MM-DDTHH:mm"));
  };

  const handleMinuteSelect = (minute: number) => {
    const updatedDatetime = currentDatetime
      .minute(minute)
      .format("YYYY-MM-DDTHH:mm");
    onChange(updatedDatetime);
  };

  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));
  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));

  const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="text-sm font-medium leading-none text-foreground">
          {label}
        </label>
      )}

      <div className="flex gap-2 w-full">
        <div className="flex-1">
          <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="default"
                className="w-full justify-start text-left font-normal h-9 px-3 bg-card border border-border text-sm text-foreground shadow-sm hover:bg-muted/20"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                {value ? (
                  currentDatetime.format("DD.MM.YYYY")
                ) : (
                  <span className="text-muted-foreground">Выберите дату</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-64 p-3 bg-card border border-border shadow-md rounded-md"
              align="start"
            >
              <div className="flex items-center justify-between mb-3">
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={prevMonth}
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="text-sm font-semibold capitalize text-foreground">
                  {currentMonth.format("MMMM YYYY")}
                </span>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={nextMonth}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground mb-1">
                {weekdays.map((day) => (
                  <div
                    key={day}
                    className="h-6 flex items-center justify-center"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {blanksArray.map((blank) => (
                  <div key={`blank-${blank}`} className="h-7" />
                ))}
                {daysArray.map((day) => {
                  const isSelected =
                    currentDatetime.date() === day &&
                    currentDatetime.month() === currentMonth.month() &&
                    currentDatetime.year() === currentMonth.year();
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      className={cn(
                        "h-7 w-7 rounded-md flex items-center justify-center text-xs transition-colors hover:bg-muted/20 text-foreground",
                        isSelected &&
                          "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold",
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-28">
          <Popover open={openTime} onOpenChange={setOpenTime}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="default"
                className="w-full justify-start text-center font-normal h-9 px-3 bg-card border border-border text-sm text-foreground shadow-sm hover:bg-muted/20 gap-2"
              >
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{currentDatetime.format("HH:mm")}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-36 p-2 bg-card border border-border shadow-md rounded-md flex gap-1 h-48"
              align="end"
            >
              <div className="flex-1 flex flex-col gap-0.5 pr-1.5 custom-scrollbar overflow-y-auto">
                {availableHours.map((hour) => {
                  const isSelected = selectedHour === hour;
                  return (
                    <button
                      key={`h-${hour}`}
                      type="button"
                      ref={(el) => {
                        hourRefs.current[hour] = el;
                      }}
                      onClick={() => handleHourSelect(hour)}
                      className={cn(
                        "text-xs py-1.5 rounded text-center transition-colors text-foreground hover:bg-muted/20 shrink-0",
                        isSelected &&
                          "bg-primary text-primary-foreground hover:bg-primary font-semibold",
                      )}
                    >
                      {hour.toString().padStart(2, "0")}
                    </button>
                  );
                })}
              </div>

              <div className="w-px bg-border my-1 shrink-0" />

              <div className="flex-1 flex flex-col gap-0.5 pr-1.5 custom-scrollbar overflow-y-auto">
                {availableMinutesForHour.map((minute) => {
                  const isSelected = selectedMinute === minute;
                  return (
                    <button
                      key={`m-${minute}`}
                      type="button"
                      ref={(el) => {
                        minuteRefs.current[minute] = el;
                      }}
                      onClick={() => handleMinuteSelect(minute)}
                      className={cn(
                        "text-xs py-1.5 rounded text-center transition-colors text-foreground hover:bg-muted/20 shrink-0",
                        isSelected &&
                          "bg-primary text-primary-foreground hover:bg-primary font-semibold",
                      )}
                    >
                      {minute.toString().padStart(2, "0")}
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {error?.message && (
        <p className="text-xs font-medium text-destructive">{error.message}</p>
      )}
    </div>
  );
}
