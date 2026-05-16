import { API_HOST } from "@/shared/api/api";
import {
  AudiencesListResponse,
  IFreeAudienceDetailResponse,
  IFreeAudiencePagedResponse,
} from "@/shared/types/subject.model";

export const audiencesService = {
  async getAll() {
    const response =
      await API_HOST.get<AudiencesListResponse>(`timetable/audience/`);
    return response;
  },

  async getFreeByParams(params: {
    datetime: string;
    floor?: number;
    page?: number;
  }) {
    const response = await API_HOST.get<IFreeAudiencePagedResponse>(
      `timetable/free-audience/`,
      { params },
    );
    return response;
  },

  async getFreeByName(name: string, params: { datetime: string }) {
    const response = await API_HOST.get<IFreeAudienceDetailResponse>(
      `timetable/free-audience/${name}/`,
      { params },
    );

    return response;
  },
};
