import { Search } from "@/components/compose";
import ProductSession from "@/components/compose/ProductSession";
import { useGetListTravels } from "@/queries/useGetListTravel";
import { useGetPopularTravel } from "@/queries/useGetPopularTravels";
import { useHeaderActions } from "@/store";
import { AppStrings } from "@/strings/app.strings";
import { useState } from "react";

const Home = () => {
  const { setHeader } = useHeaderActions();
  const [search, setSearch] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  setHeader({
    title: AppStrings.dreamtrip,
    loading: false,
  });

  const {
    data: popularTravelsData,
    isFetching: popularTravelLoading,
    refetch: popularTravelsRefetch,
    error: popularTravelError,
    isError: popularTravelIsError,
  } = useGetPopularTravel();
  const {
    data: searchTravelData,
    isLoading: searchTravelLoading,
    error: searchTravelError,
    isError: searchTravelIsError,
  } = useGetListTravels(search, startDate, endDate);

  const handleSearch = (search: string, startDate: Date, endDate: Date) => {
    console.log(search, startDate, endDate);
    setSearch(search);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div className="container px-6 m-auto py-16 max-w-2xl">
      <h2 className="text-2xl font-semibold tracking-tight py-5">
        {AppStrings.homeAppTitle}
      </h2>
      <Search onSubmitForm={handleSearch} />
      <ProductSession
        isError={searchTravelIsError}
        error={searchTravelError}
        refecth={popularTravelsRefetch}
        loading={searchTravelLoading}
        sessionName={AppStrings.yourSearch}
        travels={searchTravelData ?? []}
      />
      <ProductSession
        loading={popularTravelLoading}
        error={popularTravelError}
        isError={popularTravelIsError}
        refecth={popularTravelsRefetch}
        sessionName={AppStrings.popularPackages}
        travels={popularTravelsData ?? []}
      />
    </div>
  );
};

export default Home;
