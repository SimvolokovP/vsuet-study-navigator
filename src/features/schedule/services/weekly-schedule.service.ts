import { API_HOST } from "@/shared/api/api";
import { ISubject } from "@/shared/types/subject.model";

type weeklyScheduleServiceResponse = ISubject[];

export const weeklyScheduleService = {
  async get(
    userGroup: string,
    userSubgroup: string,
    date_min: string,
    date_max: string
  ) {
    const response = await API_HOST.get<weeklyScheduleServiceResponse>(
      `timetable/?date_min=${date_min}&date_max=${date_max}&group__name=${userGroup}&subgroup=${userSubgroup}`
    );
    return response.data;
  },
};
