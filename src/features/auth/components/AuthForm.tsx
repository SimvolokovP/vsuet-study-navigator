"use client";

import { PAGES } from "@/config/pages-url.config";
import { getGroupsOptions } from "@/shared/helpers/getGroupsOptions";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { z } from "zod";
import { useUserLocalStorage } from "@/store/use-user-local-storage.store";
import { AutoComplete } from "@/components/ui/auto-complete";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGroupsList } from "@/features/groups/hooks/use-groups-list";

const formSchema = z.object({
  group: z.string().min(1, "Выберите группу из списка"),
  subgroup: z.enum(["1", "2"]),
  number: z
    .string()
    .min(1, "Номер зачетки обязателен")
    .length(6, "Номер зачетки должен содержать 6 цифр")
    .regex(/^\d+$/, "Номер зачетки должен содержать только цифры"),
});

type AuthFormData = z.infer<typeof formSchema>;
type FormErrors = Partial<Record<keyof AuthFormData, string>>;

export function AuthForm() {
  const [formData, setFormData] = useState<AuthFormData>({
    group: "",
    subgroup: "1",
    number: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const { groupsData, isPending, error } = useGroupsList();

  const { push } = useRouter();
  const { saveUserInLocalStorage } = useUserLocalStorage();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = formSchema.parse(formData);
      saveUserInLocalStorage(validatedData);
      push(PAGES.HOME);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof AuthFormData;
          newErrors[fieldName] = issue.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleGroupChange = (value: string) => {
    console.log(value);
    setFormData((prev) => ({ ...prev, group: value }));
    if (errors.group) {
      setErrors((prev) => ({ ...prev, group: undefined }));
    }
  };

  const handleInputChange = (name: keyof AuthFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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
        onChange={(e) =>
          handleInputChange("subgroup", e.target.value as "1" | "2")
        }
        error={errors.subgroup ? { message: errors.subgroup } : undefined}
        required
      />

      <Input
        className="mb-3"
        label="Номер зачетки"
        name="number"
        placeholder="Номер зачетки (6 цифр)"
        value={formData.number}
        onChange={(e) => handleInputChange("number", e.target.value)}
        error={errors.number ? { message: errors.number } : undefined}
        required
        maxLength={6}
      />

      <Button disabled={isPending} type="submit" variant="primary">
        Войти
      </Button>
    </form>
  );
}
