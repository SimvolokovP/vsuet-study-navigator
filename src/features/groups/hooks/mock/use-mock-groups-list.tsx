import { IGroup } from "@/shared/types/subject.model";
import { MOCK_GROUPS } from "@/shared/data/mockSubjects.data";

export function useMockGroupsList() {
  return {
    groupsData: MOCK_GROUPS as IGroup[],
    isPending: false,
    error: null,
  };
}
