"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { PAGES } from "@/shared/config/pages-url.config";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useLogin } from "../hooks/use-login";

const credentialsSchema = z.object({
  username: z.string().min(1, "Введите имя пользователя"),
  password: z.string().min(1, "Введите пароль"),
});

type CredentialsData = z.infer<typeof credentialsSchema>;
type FormErrors = Partial<Record<keyof CredentialsData, string>>;

export function CredentialsAuthForm() {
  const [formData, setFormData] = useState<CredentialsData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const { push } = useRouter();

  const { login, isPending, error: apiError } = useLogin();

  const handleInputChange = (name: keyof CredentialsData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = credentialsSchema.parse(formData);

      login(validatedData, {
        onSuccess: () => {
          push(PAGES.HOME);
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof CredentialsData;
          newErrors[fieldName] = issue.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-2 md:gap-3"
    >
      <Input
        label="Имя пользователя"
        name="username"
        placeholder="Введите логин"
        value={formData.username}
        onChange={(e) => handleInputChange("username", e.target.value)}
        error={errors.username ? { message: errors.username } : undefined}
        required
      />

      <Input
        className="mb-3"
        label="Пароль"
        name="password"
        type="password"
        placeholder="Введите пароль"
        value={formData.password}
        onChange={(e) => handleInputChange("password", e.target.value)}
        error={errors.password ? { message: errors.password } : undefined}
        required
      />

      {apiError && (
        <p className="text-destructive text-sm text-center">
          Неверный логин или пароль
        </p>
      )}

      <Button disabled={isPending} type="submit" variant="primary">
        Войти
      </Button>
    </form>
  );
}
