"use client";

import { useState } from "react";
import { Funnel } from "lucide-react";
import { Layout } from "@/layout/Layout";
import { Button } from "@/components/ui/button";
import { SidePanel } from "@/components/ui/side-panel";
import { Badge } from "@/components/ui/badge";
import { FreeAudienceSearchMode } from "@/shared/types/subject.model";
import { FilterFreeAudienceForm } from "@/features/audiences/components/FreeAudienceForm";
import { Toggler } from "@/components/ui/toggler";
import { useFreeAudienceByName } from "@/features/audiences/hooks/use-free-audience-by-name";
import { useFreeAudiencesByParams } from "@/features/audiences/hooks/use-free-audiences-by-params";
import { FreeAudienceParamsResult } from "@/features/audiences/components/FreeAudienceParamsResult";
import { FreeAudienceNameResult } from "@/features/audiences/components/FreeAudienceNameResult";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorMessage } from "@/widgets/ErrorMessage";

const toggleItems = [
  { label: "По названию", value: "name" },
  { label: "По параметрам", value: "params" },
];

export function FreeAudienceSearchPage() {
  const [isModalFilterForm, setIsModalFilterForm] = useState<boolean>(false);
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);
  const [activeParamsCount, setActiveParamsCount] = useState<number>(0);
  const [activeMode, setActiveMode] = useState<FreeAudienceSearchMode>("name");

  const [page, setPage] = useState<number>(1);

  const [searchDatetime, setSearchDatetime] = useState<string>("");
  const [searchAudience, setSearchAudience] = useState<string>("");
  const [searchFloor, setSearchFloor] = useState<string>("");

  const [mode, setMode] = useState<FreeAudienceSearchMode>("name");

  const {
    data: dataByName,
    isPending: isPendingName,
    error: errorByName,
  } = useFreeAudienceByName({
    name: searchAudience,
    datetime: searchDatetime,
    enabled: searchTriggered && activeMode === "name",
  });

  const {
    data: dataByParams,
    isPending: isPendingParams,
    error: errorByParams,
  } = useFreeAudiencesByParams({
    floor: searchFloor,
    datetime: searchDatetime,
    page,
    enabled: searchTriggered && activeMode === "params",
  });

  const isLoading = activeMode === "name" ? isPendingName : isPendingParams;
  const isError = activeMode === "name" ? errorByName : errorByParams;

  const handleFilterApply = (
    formData: { datetime: string; audience: string; floor: string },
    currentMode: FreeAudienceSearchMode,
  ) => {
    let count = 1;
    if (currentMode === "name" && formData.audience.trim()) count++;
    if (currentMode === "params" && formData.floor.trim()) count++;

    setActiveMode(currentMode);
    setActiveParamsCount(count);

    setSearchDatetime(formData.datetime);
    setSearchAudience(formData.audience);
    setSearchFloor(formData.floor);

    setPage(1);
    setSearchTriggered(true);
    setIsModalFilterForm(false);
  };

  const handleFilterReset = () => {
    setSearchDatetime("");
    setSearchAudience("");
    setSearchFloor("");
    setSearchTriggered(false);
    setActiveParamsCount(0);
    setPage(1);
  };

  const handleModeChange = (value: string) => {
    const nextMode = value as FreeAudienceSearchMode;
    setMode(nextMode);
    setSearchAudience("");
    setSearchFloor("");
    handleFilterReset();
  };

  return (
    <Layout
      title="Поиск свободной аудитории"
      withBackButton
      rightButton={
        <Badge
          isHide={!searchTriggered}
          className="w-4 h-4"
          text={activeParamsCount.toString()}
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
    >
      <div className="w-full flex flex-col items-center gap-6 mt-4">
        {!searchTriggered && (
          <div className="mt-8 text-center text-foreground">
            Выберете фильтры для поиска 🔎
          </div>
        )}

        {isError && (
          <ErrorMessage
            text="Произошла ошибка"
            error={{
              message: "Данные не получены",
              name: "Данные не получены",
            }}
          />
        )}

        {isLoading && searchTriggered && (
          <Skeleton className="h-35 w-full max-w-2xl" />
        )}

        {searchTriggered && !isLoading && !isError && (
          <div className="w-full max-w-2xl flex flex-col gap-4">
            {activeMode === "name" && dataByName && (
              <FreeAudienceNameResult
                dataByName={dataByName}
                searchDatetime={searchDatetime}
              />
            )}

            {activeMode === "params" && !!dataByParams && (
              <FreeAudienceParamsResult
                dataByParams={dataByParams}
                searchFloor={searchFloor}
                page={page}
                setPage={setPage}
                searchDatetime={searchDatetime}
              />
            )}
          </div>
        )}
      </div>

      <SidePanel
        isOpen={isModalFilterForm}
        onClose={() => setIsModalFilterForm(false)}
      >
        <Toggler
          toggleList={toggleItems}
          activeToggleItem={mode}
          onToggleChange={handleModeChange}
          className="w-full justify-center mb-2"
        />
        <FilterFreeAudienceForm
          mode={mode}
          handleFilterApply={handleFilterApply}
          handleFilterReset={handleFilterReset}
          searchTriggered={searchTriggered}
        />
      </SidePanel>
    </Layout>
  );
}
