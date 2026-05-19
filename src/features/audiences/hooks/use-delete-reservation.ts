import { useMutation, useQueryClient } from "@tanstack/react-query";
import { audiencesReservationService } from "../services/audiences-reservation.service";
import { AxiosError } from "axios";

export function useDeleteReservation() {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number | string) =>
      audiencesReservationService.deleteReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReservations"] });
    },
  });

  return {
    deleteReservation: deleteMutation.mutate,
    isPending: deleteMutation.isPending,
    error: deleteMutation.error as AxiosError | null,
  };
}
