"use client";

import { getGroupsOptions } from "@/shared/helpers/getGroupsOptions";

import { FormEvent, useState } from "react";
import { z } from "zod";
import { useUserLocalStorage } from "@/store/use-user-local-storage.store";
import { AutoComplete } from "@/components/ui/auto-complete";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGroupsList } from "@/features/groups/hooks/use-groups-list";

const groupFormSchema = z.object({
  group: z.string().min(1, "Выберите группу из списка"),
  subgroup: z.enum(["1", "2"]),
});

type GroupFormData = z.infer<typeof groupFormSchema>;
type GroupFormErrors = Partial<Record<keyof GroupFormData, string>>;

export function GroupAuthForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState<GroupFormData>({
    group: "",
    subgroup: "1",
  });
  const [errors, setErrors] = useState<GroupFormErrors>({});

  const { groupsData, isPending, error } = useGroupsList();

  const { saveGroupAndSubgroup } = useUserLocalStorage();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = groupFormSchema.parse(formData);
      saveGroupAndSubgroup(validatedData.group, validatedData.subgroup);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: GroupFormErrors = {};
        error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof GroupFormData;
          newErrors[fieldName] = issue.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleGroupChange = (value: string) => {
    setFormData((prev) => ({ ...prev, group: value }));
    if (errors.group) {
      setErrors((prev) => ({ ...prev, group: undefined }));
    }
  };

  const handleSubgroupChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subgroup: value as "1" | "2" }));
    if (errors.subgroup) {
      setErrors((prev) => ({ ...prev, subgroup: undefined }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-2 md:gap-3"
    >
      <AutoComplete
        label="Группа"
        name="group"
        placeholder="Номер группы"
        options={getGroupsOptions(groupsData)}
        value={formData.group}
        onChange={handleGroupChange}
        error={error}
        isLoading={isPending}
      />

      <Select
        name="subgroup"
        options={[
          { label: "1", value: "1" },
          { label: "2", value: "2" },
        ]}
        label="Подгруппа"
        value={formData.subgroup}
        onChange={(e) => handleSubgroupChange(e.target.value)}
        error={errors.subgroup ? { message: errors.subgroup } : undefined}
        required
      />

      <Button disabled={isPending} type="submit" variant="primary">
        Сохранить
      </Button>
    </form>
  );
}
