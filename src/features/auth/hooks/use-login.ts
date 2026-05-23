import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/features/auth/services/auth.service";
import { LoginRequest } from "@/features/auth/types/auth.model";
import { setCookie } from "nookies";

export function useLogin() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      setCookie(null, "accessToken", response.data.access, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });
      setCookie(null, "refreshToken", response.data.refresh, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });

      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  return {
    login: loginMutation.mutate,
    isPending: loginMutation.isPending,
    error: loginMutation.error,
  };
}
