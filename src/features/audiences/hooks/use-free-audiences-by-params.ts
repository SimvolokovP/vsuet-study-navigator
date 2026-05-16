import { useQuery } from "@tanstack/react-query";
import { audiencesService } from "../services/audiences.service";
import { AxiosResponse } from "axios";
import { IFreeAudiencePagedResponse } from "@/shared/types/subject.model";

interface UseFreeAudiencesByParamsProps {
  floor: string;
  datetime: string;
  page: number;
  enabled: boolean;
}

export function useFreeAudiencesByParams({
  floor,
  datetime,
  page,
  enabled,
}: UseFreeAudiencesByParamsProps) {
  return useQuery<AxiosResponse<IFreeAudiencePagedResponse>>({
    queryKey: ["free-audiences-params", floor, datetime, page],
    queryFn: () =>
      audiencesService.getFreeByParams({
        datetime,
        floor: floor ? Number(floor) : undefined,
        page,
      }),
    staleTime: 60000,
    enabled: enabled && (!!floor || !!datetime),
    placeholderData: (previousData) => previousData,
  });
}
