"use client";

import { getGroupsOptions } from "@/shared/helpers/getGroupsOptions";
import { FormEvent, useState } from "react";
import { z } from "zod";
import { useUserLocalStorage } from "@/store/use-user-local-storage.store";
import { AutoComplete } from "@/components/ui/auto-complete";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMockGroupsList } from "@/features/groups/hooks/mock/use-mock-groups-list";
import { toast } from "sonner";

const formSchema = z.object({
  group: z.string().min(1, "Выберите группу из списка"),
  faculty: z.string().min(1, "Выберите факультет из списка"),
  name: z.string().min(2, "ФИО обязательно для заполнения"),
  number: z
    .string()
    .min(1, "Номер зачетки обязателен")
    .length(6, "Номер зачетки должен содержать 6 цифр")
    .regex(/^\d+$/, "Номер зачетки должен содержать только цифры"),
});

type CertificateFormData = z.infer<typeof formSchema>;
type FormErrors = Partial<Record<keyof CertificateFormData, string>>;

export function CertificateForm() {
  const { userInLocalStorage } = useUserLocalStorage();

  const [formData, setFormData] = useState<CertificateFormData>(() => {
    if (userInLocalStorage) {
      return {
        group: userInLocalStorage.group || "",
        number: userInLocalStorage.number || "",
        faculty: "",
        name: "",
      };
    }
    return {
      group: "",
      faculty: "",
      name: "",
      number: "",
    };
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // const { groupsData, isPending, error } = useGroupsList();
  const { groupsData, isPending, error } = useMockGroupsList();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = formSchema.parse(formData);
      console.log(validatedData);
      toast.success("Заявка отправлена");
      setErrors({});

      setFormData({ group: "", faculty: "", name: "", number: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof CertificateFormData;
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

  const handleInputChange = (
    name: keyof CertificateFormData,
    value: string,
  ) => {
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
      <Select
        name="faculty"
        options={[
          { label: "УИТС", value: "УИТС" },
          { label: "ИТФ", value: "ИТФ" },
          { label: "ФЭиХТ", value: "ФЭиХТ" },
          { label: "ФЭиУ", value: "ФЭиУ" },
          { label: "ТФ", value: "ТФ" },
          { label: "ФСПО", value: "ФСПО" },
        ]}
        label="Факультет"
        value={formData.faculty}
        onChange={(e) => handleInputChange("faculty", e.target.value)}
        error={errors.faculty ? { message: errors.faculty } : undefined}
        required
      />

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

      <Input
        className="mb-3"
        label="ФИО студента"
        name="ФИО"
        placeholder="ФИО"
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        error={errors.name ? { message: errors.name } : undefined}
        required
      />

      <Button type="submit" variant="primary">
        Заказать
      </Button>
    </form>
  );
}
