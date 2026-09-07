"use client";

import { hasAtLeastOneField } from "@/shared/helpers/hasAtLeastOneField";
import { IFilter } from "@/shared/types/filter.model";
import dayjs from "dayjs";
import { Funnel } from "lucide-react";
import { useState } from "react";
import { TypeViewMode } from "@/features/schedule/types/schedule.models";
import { Layout } from "@/shared/layout/Layout";
import { ScheduleWrapper } from "@/features/schedule/components/ScheduleWrapper";
import { Drawer } from "@/shared/components/ui/drawer";
import { useSearchedSchedule } from "@/features/schedule/hooks/use-searched-schedule";
import { FilterScheduleForm } from "@/features/schedule/components/forms/FilterScheduleForm";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { ViewModeToggler } from "@/features/schedule/components/ViewModeToggler";

export function ScheduleSearchPage() {
  const [isModalFilterForm, setIsModalFilterForm] = useState<boolean>(false);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const [viewMode, setViewMode] = useState<TypeViewMode>("list");

  const [filterParams, setFilterParams] = useState<IFilter>({
    group: "",
    subgroup: "1",
    teacher: "",
    audience: "",
  });

  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD"),
  );

  const { searchedScheduleData, error, isPending, refetch } =
    useSearchedSchedule(filterParams, selectedDate, searchTriggered);

  const getFilterParamsCount = (filterParams: IFilter) => {
    let count = 0;

    if (filterParams.group && filterParams.group.trim() !== "") count++;
    if (filterParams.teacher && filterParams.teacher.trim() !== "") count++;
    if (filterParams.audience && filterParams.audience.trim() !== "") count++;

    if (filterParams.group && filterParams.subgroup) count++;

    return count;
  };
  const handleFilterApply = async (filters: IFilter) => {
    if (!hasAtLeastOneField(filters)) {
      setSearchTriggered(false);
      setFilterParams(filters);
      setIsModalFilterForm(false);
      return;
    }

    setFilterParams(filters);
    setIsModalFilterForm(false);
    setSearchTriggered(true);
    refetch();
  };

  const handleFilterReset = () => {
    const resetFilters: IFilter = {
      group: "",
      subgroup: "1",
      teacher: "",
      audience: "",
    };

    setFilterParams(resetFilters);
    setSearchTriggered(false);
    setIsModalFilterForm(false);
  };

  return (
    <Layout
      title="Поиск расписания"
      rightButton={
        <Badge
          isHide={!searchTriggered}
          className="w-4 h-4"
          text={getFilterParamsCount(filterParams).toString()}
        >
          <Button
            onClick={() => setIsModalFilterForm(true)}
            className="block md:hidden"
            size={"sm"}
          >
            <Funnel size={20} />
          </Button>
          <Button
            onClick={() => setIsModalFilterForm(true)}
            variant={"default"}
            className="hidden md:block"
          >
            <Funnel size={24} />
          </Button>
        </Badge>
      }
      withBackButton
    >
      {searchTriggered ? (
        <>
          <ViewModeToggler
            disabled={isPending || !!error}
            onViewModeChange={setViewMode}
            viewMode={viewMode}
            isPending={isPending}
          />
          <ScheduleWrapper
            data={searchedScheduleData}
            error={error}
            isPending={isPending}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            viewMode={viewMode}
            scheduleType="search"
          />
        </>
      ) : (
        <div className="mt-8 text-center text-foreground">
          Выберете фильтры для поиска &#128270;
        </div>
      )}
      <Drawer
        isOpen={isModalFilterForm}
        onClose={() => setIsModalFilterForm(false)}
      >
        {isModalFilterForm && (
          <FilterScheduleForm
            searchTriggered={searchTriggered}
            handleFilterApply={handleFilterApply}
            handleFilterReset={handleFilterReset}
          />
        )}
      </Drawer>
    </Layout>
  );
}
