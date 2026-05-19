import { API_HOST } from "@/shared/api/api";
import { IGroup } from "@/shared/types/subject.model";

type GroupsListResponse = IGroup[];

export const groupsService = {
  async getAll() {
    const response = await API_HOST.get<GroupsListResponse>(`api/timetable/group/`);
    return response;
  },
};
