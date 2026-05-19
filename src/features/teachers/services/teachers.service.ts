import { API_HOST } from "@/shared/api/api";
import { ITeacher } from "@/shared/types/subject.model";

type TeachersListResponse = ITeacher[];

export const teachersService = {
  async getAll() {
    const response = await API_HOST.get<TeachersListResponse>(
      `api/users/teachers/`
    );
    return response;
  },
};
