import { AppStrings } from "@/strings/app.strings";
import { create } from "zustand";

interface IHeaderState {
  title: string;
  loading: boolean;
}

interface IHeaderStore {
  title: string;
  loading: boolean;
  actions: {
    setHeader: ({ title, loading }: IHeaderState) => void;
  };
}

export const useHeaderStore = create<IHeaderStore>((set) => ({
  title: AppStrings.dreamtrip,
  loading: false,
  actions: {
    setHeader: ({ title, loading }) => set({ title, loading }),
  },
}));

export const useHeader = () => useHeaderStore((state) => state);
export const useHeaderActions = () => useHeaderStore((state) => state.actions);
