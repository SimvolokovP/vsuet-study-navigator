"use client";

import { IFilter } from "@/shared/types/filter.model";
import { FormEvent, useEffect, useState } from "react";
import { z } from "zod";
import { useFilterSearch } from "../../hooks/use-filter-search";
import { AutoComplete } from "@/components/ui/auto-complete";
import { getGroupsOptions } from "@/shared/helpers/getGroupsOptions";
import { Select } from "@/components/ui/select";
import { getTeachersOptions } from "@/shared/helpers/getTeachersOptions";
import { getAudiencesOptions } from "@/shared/helpers/getAudiencesOptions";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/Loader";
import { Divider } from "@/components/ui/divider";
import { useFilterScheduleStore } from "@/store/use-filter-schedule.store";
import { useMockFilterSearch } from "../../hooks/mock/use-mock-filter-search";

const formSchema = z
  .object({
    group: z.string().optional(),
    subgroup: z.enum(["1", "2", ""]).optional(),
    teacher: z.string().optional(),
    audience: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.group !== "" || data.teacher !== "" || data.audience !== "";
    },
    {
      message: "Заполните хотя бы один параметр для поиска",
      path: ["root"],
    },
  );

type FilterFormData = z.infer<typeof formSchema>;
type FormErrors = Partial<Record<keyof FilterFormData, string>> & {
  root?: string;
};

interface FilterSearchFormProps {
  handleFilterApply: (filters: IFilter) => void;
  handleFilterReset: () => void;
}

export function FilterScheduleForm({
  handleFilterApply,
  handleFilterReset,
}: FilterSearchFormProps) {
  const { filters, setFilters, clearFilters } = useFilterScheduleStore();

  const [errors, setErrors] = useState<FormErrors>({});

  // const filterSearch = useFilterSearch();

  const filterSearch = useMockFilterSearch();

  useEffect(() => {
    if (!filters.group && !filters.teacher && !filters.audience) {
      return;
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = formSchema.parse(filters);
      handleFilterApply(validatedData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((issue) => {
          if (issue.path[0] === "root") {
            newErrors.root = issue.message;
          } else {
            const fieldName = issue.path[0] as keyof FilterFormData;
            newErrors[fieldName] = issue.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleReset = () => {
    handleFilterReset();
    clearFilters();
    setErrors({});
  };

  const handleInputChange = (name: keyof IFilter, value: string) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    // Очищаем ошибки при изменении
    if (errors.root) {
      setErrors((prev) => ({ ...prev, root: undefined }));
    }
    if (errors[name as keyof FilterFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const hasAtLeastOneField = () => {
    return (
      filters.group !== "" || filters.teacher !== "" || filters.audience !== ""
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="w-full flex flex-col gap-3 md:gap-4 py-2 px-0.5"
    >
      <AutoComplete
        label="Группа"
        name="group"
        placeholder="Выберите группу"
        options={getGroupsOptions(filterSearch.filtersData.groups) || []}
        value={filters.group || ""}
        onChange={(value) => handleInputChange("group", value)}
        error={
          errors.group
            ? { message: errors.group, name: errors.group }
            : undefined
        }
        isLoading={filterSearch.isLoading}
        disabled={filterSearch.isLoading}
      />

      <Select
        name="subgroup"
        options={[
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "Все", value: "all" },
        ]}
        label="Подгруппа"
        value={filters.subgroup === "" ? "all" : filters.subgroup || "all"}
        onChange={(e) => {
          const value = e.target.value === "all" ? "" : e.target.value;
          handleInputChange("subgroup", value);
        }}
        error={errors.subgroup ? { message: errors.subgroup } : undefined}
      />

      <AutoComplete
        label="Преподаватель"
        name="teacher"
        placeholder="ФИО преподавателя"
        options={getTeachersOptions(filterSearch.filtersData.teachers) || []}
        value={filters.teacher || ""}
        onChange={(value) => handleInputChange("teacher", value)}
        error={
          errors.teacher
            ? { message: errors.teacher, name: errors.teacher }
            : undefined
        }
        isLoading={filterSearch.isLoading}
        disabled={filterSearch.isLoading}
      />

      <AutoComplete
        label="Аудитория"
        name="audience"
        placeholder="Номер аудитории"
        options={getAudiencesOptions(filterSearch.filtersData.audiences) || []}
        value={filters.audience || ""}
        onChange={(value) => handleInputChange("audience", value)}
        error={
          errors.audience
            ? { message: errors.audience, name: errors.audience }
            : undefined
        }
        isLoading={filterSearch.isLoading}
        disabled={filterSearch.isLoading}
      />

      {errors.root && (
        <div className="text-error text-center text-sm p-2 bg-error/10 rounded">
          {errors.root}
        </div>
      )}

      <div className="flex gap-2">
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={
            !hasAtLeastOneField() ||
            filterSearch.isLoading ||
            !!filterSearch.error
          }
        >
          {filterSearch.isLoading ? <Loader size={20} /> : "Поиск"}
        </Button>

        <Button type="reset" variant="default" className="flex-1">
          Сбросить фильтры
        </Button>
      </div>

      {filterSearch.error && (
        <>
          <Divider />
          <div className="text-error text-center text-sm">Error</div>
        </>
      )}
    </form>
  );
}
