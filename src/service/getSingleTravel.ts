import { ITravelApresentation } from "@/interfaces/travel";
import { requester } from "../api/requester";
import { ENDPOINTS } from "@/api/endpoints";

export const getTravelById = async (
  id: string
): Promise<ITravelApresentation> => {
  const { data } = await requester({
    params: {
      id,
    },
  }).get<ITravelApresentation>(`${ENDPOINTS.findTravel}`);

  return data;
};
