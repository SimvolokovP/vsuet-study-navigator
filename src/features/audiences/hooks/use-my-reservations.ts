import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { audiencesReservationService } from "../services/audiences-reservation.service";

export function useMyReservations(page: number = 1) {
  const reservationsQuery = useQuery({
    queryKey: ["myReservations", page],
    queryFn: () => audiencesReservationService.getMyReservations(page),
    staleTime: 60000,
    select: (data) => data?.data,
  });

  return {
    reservationsData: reservationsQuery.data,
    isPending: reservationsQuery.isPending,
    error: reservationsQuery.error as AxiosError | null,
    refetch: reservationsQuery.refetch,
  };
}
