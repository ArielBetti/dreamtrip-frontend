import { TUser } from "@/interfaces/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  user: TUser | null;
  token: string;
  actions: {
    setUser: (user: TUser) => void;
    setToken: (token: string) => void;
    logout: () => void;
  };
};

const initialState = {
  user: null,
  token: "",
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        setUser: (user) => set({ user }),
        setToken: (token) => set({ token }),
        logout: () => set({ ...initialState }),
      },
    }),
    {
      name: "dreamtrip-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);

export const useUser = () => useAuthStore((state) => state.user);
export const useToken = () => useAuthStore((state) => state.token);
export const useAuthActions = () => useAuthStore((state) => state.actions);
