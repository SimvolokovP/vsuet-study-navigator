import { useQuery } from "@tanstack/react-query";
import { teachersService } from "../services/teachers.service";

export function useTeachersList() {
  const teachersQuery = useQuery({
    queryKey: ["teachers"],
    queryFn: () => teachersService.getAll(),
    staleTime: 300000, //time
    select: (data) => data?.data || [],
  });

  return {
    teachersData: teachersQuery.data,
    isPending: teachersQuery.isPending,
    error: teachersQuery.error,
  };
}
