import { IFilter } from "@/shared/types/filter.model";

export const hasAtLeastOneField = (filters: IFilter) => {
  return (
    filters.group !== "" || filters.teacher !== "" || filters.audience !== ""
  );
};
