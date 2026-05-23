import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/features/auth/services/auth.service";
import { parseCookies, destroyCookie } from "nookies";

export function useLogout() {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const cookies = parseCookies();
      const refresh = cookies.refreshToken;
      if (!refresh) return;
      return authService.logout({ refresh });
    },

    onSettled: () => {
      destroyCookie(null, "accessToken", { path: "/" });
      destroyCookie(null, "refreshToken", { path: "/" });

      queryClient.setQueryData(["currentUser"], null);
      queryClient.removeQueries({ queryKey: ["currentUser"] });
    },
  });

  return {
    logout: logoutMutation.mutate,
    isPending: logoutMutation.isPending,
    error: logoutMutation.error,
  };
}
