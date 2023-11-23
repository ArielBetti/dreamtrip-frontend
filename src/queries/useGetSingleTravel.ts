// service
import { getTravelById } from "@/service/getSingleTravel";
import { useQuery } from "react-query";

// ::
export const useGetSingleTravel = (id: string) => {
  return useQuery({
    queryKey: [`single-travel`, id],
    queryFn: () => getTravelById(id),
    refetchOnWindowFocus: false,
    retry: 3,
  });
};
