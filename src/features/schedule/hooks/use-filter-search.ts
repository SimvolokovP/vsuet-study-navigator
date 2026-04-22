import { useAudiencesList } from "@/features/audiences/hooks/use-audiences-list";
import { useGroupsList } from "@/features/groups/hooks/use-groups-list";
import { useTeachersList } from "@/features/teachers/hooks/use-teachers-list";

export function useFilterSearch() {
  const groupsListQuery = useGroupsList();

  const audiencesListQuery = useAudiencesList();

  const teachersListQuery = useTeachersList();

  return {
    filtersData: {
      groups: groupsListQuery.groupsData,
      audiences: audiencesListQuery.audiencesData,
      teachers: teachersListQuery.teachersData,
    },
    isLoading:
      groupsListQuery.isPending ||
      audiencesListQuery.isPending ||
      teachersListQuery.isPending,

    error:
      groupsListQuery.error ||
      audiencesListQuery.error ||
      teachersListQuery.error,
  };
}
