// service
import { getTravelList } from "@/service/getTravelList";
import { useQuery } from "react-query";

// ::
export const useGetListTravels = (
  search: string,
  startDate?: Date,
  endDate?: Date
) => {
  return useQuery({
    queryKey: [`single-travel-search`, search, startDate, endDate],
    queryFn: () => getTravelList(search, startDate, endDate),
    refetchOnWindowFocus: false,
    enabled: !!search || !!startDate || !!endDate,
    retry: 3,
  });
};
