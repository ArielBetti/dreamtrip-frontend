import { AppStrings } from "@/strings/app.strings";
import { create } from "zustand";

interface ISearchState {
  startDate?: Date;
  endDate?: Date;
}

interface ISearchStore {
  startDate?: Date;
  endDate?: Date;
  actions: {
    setSearchDate: ({ endDate, startDate }: ISearchState) => void;
  };
}

export const useSearchStore = create<ISearchStore>((set) => ({
  title: AppStrings.dreamtrip,
  loading: false,
  actions: {
    setSearchDate: ({ endDate, startDate }) => set({ endDate, startDate }),
  },
}));

export const useSearch = () => useSearchStore((state) => state);
export const useSearchActions = () => useSearchStore((state) => state.actions);
