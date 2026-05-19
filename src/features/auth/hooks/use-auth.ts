import { useQuery } from "@tanstack/react-query";
import { authService } from "@/features/auth/services/auth.service";
import { UserMeResponse } from "@/features/auth/types/auth.model";

export function useAuth() {
  const tokenExists =
    typeof window !== "undefined" && !!localStorage.getItem("accessToken");

  const userQuery = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authService.getMe(),
    staleTime: 600000,
    select: (data) => data?.data,
    enabled: tokenExists,
  });

  return {
    userData: userQuery.data as UserMeResponse | undefined,
    isPending: userQuery.isPending && userQuery.isFetching,
    error: userQuery.error,
  };
}
