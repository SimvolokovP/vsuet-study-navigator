import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface IUserInLocalStorage {
  group: string;
  subgroup: string;
  number: string;
}

interface UserLocalStorageState {
  userInLocalStorage: IUserInLocalStorage | null;
  saveUserInLocalStorage: (user: IUserInLocalStorage) => void;
  clearUserLocalStorage: () => void;
  loadUserFromLocalStorage: () => Promise<void>;
}

export const useUserLocalStorage = create<UserLocalStorageState>()(
  persist(
    (set) => ({
      userInLocalStorage: null,
      saveUserInLocalStorage: (user: IUserInLocalStorage) => {
        set({ userInLocalStorage: user });
      },
      clearUserLocalStorage: () => {
        set({ userInLocalStorage: null });
      },
      loadUserFromLocalStorage: async () => {},
    }),
    {
      name: "vsuet_schedule_user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
