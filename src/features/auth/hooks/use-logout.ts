import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/features/auth/services/auth.service";

export function useLogout() {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const refresh =
        typeof window !== "undefined"
          ? localStorage.getItem("refreshToken")
          : null;
      if (!refresh) return;
      return authService.logout({ refresh });
    },

    onSettled: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }

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
