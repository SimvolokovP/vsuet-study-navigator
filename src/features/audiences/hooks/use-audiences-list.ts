import { useQuery } from "@tanstack/react-query";
import { IGroup } from "@/shared/types/subject.model";
import { audiencesService } from "../services/audiences.service";

export function useAudiencesList() {
  const audiencesQuery = useQuery({
    queryKey: ["audiences"],
    queryFn: () => audiencesService.getAll(),
    staleTime: 300000, //time
    select: (data) => data?.data || [],
  });

  return {
    audiencesData: audiencesQuery.data as IGroup[],
    isPending: audiencesQuery.isPending,
    error: audiencesQuery.error,
  };
}
