import { getPopularTravels } from "@/service/getPopularTravels";
import { useQuery } from "react-query";

export const useGetPopularTravel = () => {
  return useQuery({
    queryKey: [`popular-travels`],
    queryFn: () => getPopularTravels(),
    refetchOnWindowFocus: false,
		retry: 3,
  });
};
