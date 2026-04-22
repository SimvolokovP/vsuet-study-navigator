import { IGroup } from "@/shared/types/subject.model";

export function getGroupsOptions(groups: IGroup[]) {
  return (
    groups?.map((group) => ({
      value: group.name,
      label: group.name,
    })) || []
  );
}
