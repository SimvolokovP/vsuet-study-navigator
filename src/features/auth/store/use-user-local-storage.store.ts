import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface IUserInLocalStorage {
  group?: string;
  subgroup?: string;
  number?: string;
}

interface UserLocalStorageState {
  userInLocalStorage: IUserInLocalStorage | null;
  saveUserInLocalStorage: (user: IUserInLocalStorage) => void;
  saveGroupAndSubgroup: (group: string, subgroup: string) => void;
  saveNumber: (number: string) => void;
  clearUserLocalStorage: () => void;
  loadUserFromLocalStorage: () => Promise<void>;
}

export const useUserLocalStorage = create<UserLocalStorageState>()(
  persist(
    (set, get) => ({
      userInLocalStorage: null,

      saveUserInLocalStorage: (user: IUserInLocalStorage) => {
        set({ userInLocalStorage: user });
      },

      saveGroupAndSubgroup: (group: string, subgroup: string) => {
        const currentUser = get().userInLocalStorage;
        set({
          userInLocalStorage: {
            group,
            subgroup,
            number: currentUser?.number || "",
          },
        });
      },

      saveNumber: (number: string) => {
        const currentUser = get().userInLocalStorage;
        if (currentUser) {
          set({
            userInLocalStorage: {
              ...currentUser,
              number,
            },
          });
        } else {
          set({
            userInLocalStorage: {
              group: "",
              subgroup: "",
              number,
            },
          });
        }
      },

      clearUserLocalStorage: () => {
        set({ userInLocalStorage: null });
      },

      loadUserFromLocalStorage: async () => {},
    }),
    {
      name: "vsuet_schedule_user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
