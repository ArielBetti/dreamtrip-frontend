import { ITravelApresentation } from "@/interfaces/travel";
import { requester } from "../api/requester";
import { ENDPOINTS } from "@/api/endpoints";

export const getPopularTravels = async (): Promise<ITravelApresentation[]> => {
  const { data } = await requester({}).get<ITravelApresentation[]>(
    `${ENDPOINTS.popularTravels}`
  );

  return data;
};
