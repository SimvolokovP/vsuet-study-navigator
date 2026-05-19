import { API_HOST } from "@/shared/api/api";
import {
  CreateReservationRequest,
  ReservationItem,
  ReservationsListResponse,
} from "@/shared/types/subject.model";

export const audiencesReservationService = {
  async getMyReservations(page: number = 1) {
    const response = await API_HOST.get<ReservationsListResponse>(
      `api/users/reservations/`,
      {
        params: { page },
      },
    );
    return response;
  },

  async createReservation(data: CreateReservationRequest) {
    const response = await API_HOST.post<ReservationItem>(
      `api/users/reservations/`,
      data,
    );
    return response;
  },

  async deleteReservation(id: number | string) {
    const response = await API_HOST.delete<void>(
      `api/users/reservations/${id}/`,
    );
    return response;
  },
};
