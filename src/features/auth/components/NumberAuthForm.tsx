"use client";

import { FormEvent, useState } from "react";
import { z } from "zod";
import { useUserLocalStorage } from "@/store/use-user-local-storage.store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const numberFormSchema = z.object({
  number: z
    .string()
    .min(1, "Номер зачетки обязателен")
    .length(6, "Номер зачетки должен содержать 6 цифр")
    .regex(/^\d+$/, "Номер зачетки должен содержать только цифры"),
});

type NumberFormData = z.infer<typeof numberFormSchema>;
type NumberFormErrors = Partial<Record<keyof NumberFormData, string>>;

export function NumberAuthForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState<NumberFormData>({
    number: "",
  });
  const [errors, setErrors] = useState<NumberFormErrors>({});

  const { saveNumber } = useUserLocalStorage();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = numberFormSchema.parse(formData);
      saveNumber(validatedData.number);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: NumberFormErrors = {};
        error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof NumberFormData;
          newErrors[fieldName] = issue.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleNumberChange = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "");
    setFormData({ number: numbersOnly });
    if (errors.number) {
      setErrors({ number: undefined });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-2 md:gap-3"
    >
      <Input
        className="mb-3"
        label="Номер зачетки"
        name="number"
        placeholder="Номер зачетки (6 цифр)"
        value={formData.number}
        onChange={(e) => handleNumberChange(e.target.value)}
        error={errors.number ? { message: errors.number } : undefined}
        required
        maxLength={6}
        type="text"
        inputMode="numeric"
        pattern="\d*"
      />

      <Button type="submit" variant="primary">
        Войти
      </Button>
    </form>
  );
}
