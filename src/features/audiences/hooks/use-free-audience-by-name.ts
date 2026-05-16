import { useQuery } from "@tanstack/react-query";
import { audiencesService } from "../services/audiences.service";
import { AxiosResponse } from "axios";
import { IFreeAudienceDetailResponse } from "@/shared/types/subject.model";

interface UseFreeAudienceByNameProps {
  name: string;
  datetime: string;
  enabled: boolean;
}

export function useFreeAudienceByName({
  name,
  datetime,
  enabled,
}: UseFreeAudienceByNameProps) {
  return useQuery<AxiosResponse<IFreeAudienceDetailResponse>>({
    queryKey: ["free-audience-name", name, datetime],
    queryFn: () => audiencesService.getFreeByName(name.trim(), { datetime }),
    staleTime: 60000,
    enabled: enabled && !!name.trim(),
  });
}
