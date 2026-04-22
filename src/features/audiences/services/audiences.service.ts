import { API_HOST } from "@/shared/api/api";
import { IAudience } from "@/shared/types/subject.model";

type AudiencesListResponse = IAudience[];

export const audiencesService = {
  async getAll() {
    const response = await API_HOST.get<AudiencesListResponse>(
      `timetable/audience/`
    );
    return response;
  },
};
