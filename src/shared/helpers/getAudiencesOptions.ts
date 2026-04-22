import { IAudience } from "@/shared/types/subject.model";

export function getAudiencesOptions(audiences: IAudience[]) {
  return (
    audiences?.map((group) => ({
      value: group.name,
      label: group.name,
    })) || []
  );
}
