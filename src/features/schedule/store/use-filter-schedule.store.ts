import { IFilter } from "@/shared/types/filter.model";
import { create } from "zustand";

interface FilterStore {
  filters: IFilter;
  setFilters: (filters: IFilter) => void;
  clearFilters: () => void;
}

export const useFilterScheduleStore = create<FilterStore>()((set) => ({
  filters: {
    group: "",
    subgroup: "1",
    teacher: "",
    audience: "",
  },
  setFilters: (filters) => set({ filters }),
  clearFilters: () =>
    set({
      filters: {
        group: "",
        subgroup: "1",
        teacher: "",
        audience: "",
      },
    }),
}));
