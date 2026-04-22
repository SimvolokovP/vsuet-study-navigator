import {
  MOCK_AUDIENCES,
  MOCK_GROUPS,
  MOCK_TEACHERS,
} from "@/shared/data/mockSubjects.data";

export function useMockFilterSearch() {
  const groupsListQuery = MOCK_GROUPS;

  const audiencesListQuery = MOCK_AUDIENCES;

  const teachersListQuery = MOCK_TEACHERS;

  return {
    filtersData: {
      groups: groupsListQuery,
      audiences: audiencesListQuery,
      teachers: teachersListQuery,
    },
    isLoading: false,

    error: null,
  };
}
