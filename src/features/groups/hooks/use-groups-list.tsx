import { useQuery } from "@tanstack/react-query";
import { IGroup } from "@/shared/types/subject.model";
import { groupsService } from "../services/groups.service";

export function useGroupsList() {
  const groupsQuery = useQuery({
    queryKey: ["groups"],
    queryFn: () => groupsService.getAll(),
    staleTime: 300000,
    select: (data) => data?.data || [],
  });

  return {
    groupsData: groupsQuery.data as IGroup[],
    isPending: groupsQuery.isPending,
    error: groupsQuery.error,
  };
}
