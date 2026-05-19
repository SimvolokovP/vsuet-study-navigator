import { CreateReservationRequest } from "@/shared/types/subject.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { audiencesReservationService } from "../services/audiences-reservation.service";

export function useCreateReservation() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CreateReservationRequest) =>
      audiencesReservationService.createReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReservations"] });
      queryClient.invalidateQueries({ queryKey: ["free-audience-name"] });

      queryClient.invalidateQueries({ queryKey: ["free-audiences-params"] });
    },
  });

  return {
    createReservation: createMutation.mutate,
    isPending: createMutation.isPending,
    error: createMutation.error as AxiosError | null,
  };
}
