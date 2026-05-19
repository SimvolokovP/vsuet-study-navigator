import { API_HOST } from "@/shared/api/api";
import { IFilter } from "@/shared/types/filter.model";
import { ISubject } from "@/shared/types/subject.model";

type searchScuduleServiceResponse = ISubject[];
type weeklyScheduleServiceResponse = ISubject[];

interface ITeachersScheduleServiceResponse {
  id: number;
  first_name: string;
  last_name: string;
  patronymic: string;
  subjects: ISubject[];
}

export const scheduleService = {
  async getWeeklySchedule(
    userGroup: string,
    userSubgroup: string,
    date_min: string,
    date_max: string,
  ) {
    const response = await API_HOST.get<weeklyScheduleServiceResponse>(
      `api/timetable/?date_min=${date_min}&date_max=${date_max}&group__name=${userGroup}&subgroup=${userSubgroup}`,
    );
    return response.data;
  },

  async getScheduleByParams(
    filtersList: IFilter,
    date_min: string,
    date_max: string,
  ) {
    const { audience, group, subgroup, teacher } = filtersList;

    let url = `api/timetable/?date_min=${date_min}&date_max=${date_max}`;

    if (group) url += `&group__name=${group}`;
    if (group && subgroup) url += `&subgroup=${subgroup}`;
    if (teacher) url += `&teacher=${teacher}`;
    if (audience) url += `&audience__name=${audience}`;

    const response = await API_HOST.get<searchScuduleServiceResponse>(url);
    return response.data;
  },

  async getScheduleByTeacherId(id: number, date_min: string, date_max: string) {
    const response = await API_HOST.get<ITeachersScheduleServiceResponse>(
      `api/users/teachers/${id}/?date_min=${date_min}&date_max=${date_max}`,
    );
    return response;
  },
};
