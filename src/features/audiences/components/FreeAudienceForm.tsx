"use client";

import dayjs from "dayjs";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { AutoComplete } from "@/components/ui/auto-complete";
import { Select } from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAudiencesOptions } from "@/shared/helpers/getAudiencesOptions";
import { getTimeSlotsOptions } from "@/shared/helpers/getTimeSlotsOptions";
import { useAudiencesList } from "../hooks/use-audiences-list";
import { FreeAudienceSearchMode } from "@/shared/types/subject.model";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { TIME_SLOTS } from "@/shared/data/date.data";
import { getClosestTimeSlot } from "@/shared/helpers/getClosestTimeSlot";

interface FilterFreeAudienceFormProps {
  mode: FreeAudienceSearchMode;
  handleFilterApply: (
    formData: { datetime: string; audience: string; floor: string },
    mode: FreeAudienceSearchMode,
  ) => void;
  handleFilterReset: () => void;
  searchTriggered: boolean;
}

export function FilterFreeAudienceForm({
  handleFilterApply,
  mode,
  handleFilterReset,
  searchTriggered,
}: FilterFreeAudienceFormProps) {
  const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD"));

  const [timeSlot, setTimeSlot] = useState<string>(() =>
    getClosestTimeSlot(TIME_SLOTS),
  );

  const [audience, setAudience] = useState<string>("");
  const [floor, setFloor] = useState<string>("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const { audiencesData, isPending, error } = useAudiencesList();

  const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const getDaysInMonth = () => {
    const daysInMonth = currentMonth.daysInMonth();
    const firstDayOfMonth = currentMonth.startOf("month").day();
    const blanksArray = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    return { daysInMonth, blanksArray };
  };

  const { daysInMonth, blanksArray } = getDaysInMonth();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const handleDateSelect = (day: number) => {
    const newDate = currentMonth.date(day).format("YYYY-MM-DD");
    setDate(newDate);
    setOpenCalendar(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedTime = timeSlot
      ? timeSlot.slice(0, 5)
      : dayjs().format("HH:mm");
    const datetime = dayjs(`${date} ${formattedTime}`).format(
      "YYYY-MM-DDTHH:mm",
    );

    handleFilterApply({ datetime, audience, floor }, mode);
  };

  const handleReset = () => {
    setAudience("");
    setFloor("");
    handleFilterReset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-4 py-2 px-0.5"
    >
      <div className="flex flex-col md:flex-row md:items-end gap-2">
        <div className="flex flex-col gap-2 flex-1">
          <label className="text-sm font-medium leading-none text-foreground">
            Дата и время поиска
          </label>
          <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="default"
                className="w-full justify-start text-left font-normal h-9 px-3 bg-card border border-border text-sm shadow-sm hover:bg-muted/20"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  dayjs(date).format("DD.MM.YYYY")
                ) : (
                  <span>Выберите дату</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-64 p-3 bg-card border border-border shadow-md rounded-md z-50"
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
                {Array.from({ length: blanksArray }).map((_, blank) => (
                  <div key={`blank-${blank}`} className="h-7" />
                ))}
                {daysArray.map((day) => {
                  const isSelected =
                    date === currentMonth.date(day).format("YYYY-MM-DD");
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

        <Select
          required
          placeholder="Время"
          options={getTimeSlotsOptions()}
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="flex-1"
        />
      </div>

      {mode === "name" ? (
        <AutoComplete
          label="Аудитория"
          name="audience"
          placeholder="Номер аудитории"
          options={getAudiencesOptions(audiencesData) || []}
          value={audience}
          onChange={setAudience}
          isLoading={isPending}
          disabled={isPending}
        />
      ) : (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground leading-none">
            Этаж
          </label>
          <input
            type="number"
            placeholder="Номер этажа"
            value={floor}
            className="flex h-9 w-full rounded-md border border-border bg-card px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onChange={(e) => setFloor(e.target.value)}
          />
        </div>
      )}

      <div className="flex gap-2 mt-2">
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={
            mode === "name"
              ? !audience.trim()
              : !floor.trim() || isPending || !!error
          }
        >
          Найти
        </Button>
        <Button
          disabled={!searchTriggered}
          type="button"
          variant="default"
          className="flex-1"
          onClick={handleReset}
        >
          Сбросить
        </Button>
      </div>
    </form>
  );
}
