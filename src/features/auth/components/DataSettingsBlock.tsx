"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/Loader";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { AutoComplete } from "@/components/ui/auto-complete";
import { useGroupsList } from "@/features/groups/hooks/use-groups-list";
import { getGroupsOptions } from "@/shared/helpers/getGroupsOptions";
import {
  IUserInLocalStorage,
  useUserLocalStorage,
} from "@/store/use-user-local-storage.store";
import { FormEvent, useState, useCallback } from "react";
import { z } from "zod";

const scheduleFormSchema = z.object({
  group: z.string().optional(),
  subgroup: z.enum(["1", "2"]).optional().default("1"),
  number: z
    .string()
    .optional()
    .refine((val) => !val || (val.length === 6 && /^\d+$/.test(val)), {
      message: "Номер зачетки должен содержать 6 цифр",
    }),
});

type ScheduleFormData = z.infer<typeof scheduleFormSchema>;
type FormErrors = Partial<Record<keyof ScheduleFormData, string>>;

interface DataSettingsBlockProps {
  userInLocalStorage: IUserInLocalStorage | null;
  isLoading: boolean;
  onSave: (data: IUserInLocalStorage) => void;
}

export function DataSettingsBlock({
  userInLocalStorage,
  isLoading,
  onSave,
}: DataSettingsBlockProps) {
  const { clearUserLocalStorage } = useUserLocalStorage();

  const {
    groupsData,
    isPending: isGroupsPending,
    error: groupsError,
  } = useGroupsList();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ScheduleFormData>({
    group: (userInLocalStorage && userInLocalStorage.group) || "",
    subgroup:
      (userInLocalStorage && (userInLocalStorage.subgroup as "1" | "2")) || "1",
    number: (userInLocalStorage && userInLocalStorage.number) || "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = useCallback((): boolean => {
    try {
      scheduleFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof ScheduleFormData;
          newErrors[fieldName] = issue.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [formData]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const dataToSave: IUserInLocalStorage = {
      group: formData.group || "",
      subgroup: formData.subgroup || "1",
      number: formData.number || "",
    };

    onSave(dataToSave);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (userInLocalStorage) {
      setFormData({
        group: userInLocalStorage.group || "",
        subgroup: (userInLocalStorage.subgroup as "1" | "2") || "1",
        number: userInLocalStorage.number || "",
      });
    } else {
      setFormData({
        group: "",
        subgroup: "1",
        number: "",
      });
    }
    setErrors({});
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof ScheduleFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const hasAnyData =
    userInLocalStorage &&
    (userInLocalStorage.group || userInLocalStorage.number);

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 anim-hover">
        <div className="font-bold text-center text-lg md:text-xl mb-2 md:mb-4">
          Данные в системе
        </div>
        <div className="flex items-center justify-center py-4">
          <Loader size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 anim-hover">
      <div className="font-bold text-center text-lg md:text-xl mb-2 md:mb-4">
        Данные в системе
      </div>

      {isEditing || !hasAnyData ? (
        <form onSubmit={handleSave} className="flex flex-col gap-3 w-full">
          <AutoComplete
            label="Группа"
            name="group"
            placeholder="Номер группы"
            options={getGroupsOptions(groupsData)}
            value={formData.group || ""}
            onChange={(val) => handleFieldChange("group", val)}
            error={groupsError}
            isLoading={isGroupsPending}
          />

          <Select
            name="subgroup"
            options={[
              { label: "1", value: "1" },
              { label: "2", value: "2" },
            ]}
            label="Подгруппа"
            value={formData.subgroup || "1"}
            onChange={(e) => handleFieldChange("subgroup", e.target.value)}
            required={false}
          />

          <div>
            <Input
              label="Номер зачетки"
              name="number"
              placeholder="6 цифр"
              value={formData.number || ""}
              onChange={(e) =>
                handleFieldChange(
                  "number",
                  e.target.value.replace(/\D/g, "").slice(0, 6),
                )
              }
              maxLength={6}
              required={false}
            />
            {errors.number && (
              <p className="text-sm text-red-500 mt-1">{errors.number}</p>
            )}
          </div>

          <div className="flex gap-2 justify-end mt-2">
            {hasAnyData && (
              <Button type="button" variant="default" onClick={handleCancel}>
                Отмена
              </Button>
            )}
            <Button type="submit" variant="primary">
              Сохранить настройки
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-2 text-base md:text-lg">
          <div>
            Группа:{" "}
            <span className="font-bold">{userInLocalStorage?.group}</span>
            {userInLocalStorage.subgroup && (
              <span className="font-bold ml-2">
                (подгр. {userInLocalStorage?.subgroup})
              </span>
            )}
          </div>
          <div>
            Номер зачетки:{" "}
            <span className="font-bold">{userInLocalStorage?.number}</span>
          </div>

          {!userInLocalStorage.group && !userInLocalStorage.number && (
            <div className="text-center text-muted-foreground">
              Нет сохраненных данных
            </div>
          )}

          <div className="flex justify-center gap-2 mt-3">
            <Button variant="default" onClick={() => setIsEditing(true)}>
              {hasAnyData ? "Редактировать данные" : "Добавить данные"}
            </Button>
            {hasAnyData && (
              <Button
                variant="destructive"
                onClick={() => clearUserLocalStorage()}
              >
                Удалить данные
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
