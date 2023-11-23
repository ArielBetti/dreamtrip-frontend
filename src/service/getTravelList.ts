import { ITravelApresentation } from "@/interfaces/travel";
import { requester } from "../api/requester";
import { ENDPOINTS } from "@/api/endpoints";

export const getTravelList = async (
  search: string,
  startDate?: Date,
  endDate?: Date
): Promise<ITravelApresentation[]> => {
  const { data } = await requester({
    params: {
      search,
      startDate,
      endDate,
    },
  }).get<ITravelApresentation[]>(`${ENDPOINTS.findTravelList}`);

  return data;
};
