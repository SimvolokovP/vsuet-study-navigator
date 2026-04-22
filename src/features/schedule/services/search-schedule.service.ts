import { API_HOST } from "@/shared/api/api";
import { IFilter } from "@/shared/types/filter.model";
import { ISubject } from "@/shared/types/subject.model";

type searchScuduleServiceResponse = ISubject[];

export const searchScuduleService = {
  async get(filtersList: IFilter, date_min: string, date_max: string) {
    const { audience, group, subgroup, teacher } = filtersList;

    let url = `timetable/?date_min=${date_min}&date_max=${date_max}`;

    if (group) url += `&group__name=${group}`;
    if (group && subgroup) url += `&subgroup=${subgroup}`;
    if (teacher) url += `&teacher=${teacher}`;
    if (audience) url += `&audience__name=${audience}`;

    const response = await API_HOST.get<searchScuduleServiceResponse>(url);
    return response.data;
  },
};
