import { create } from "zustand";
import { Locale, Theme } from "~/types";

export const useUser = create<State & Actions>((set) => ({
  user: {
    id: "",
    username: "",
    image: "",
  },
  setting: {
    theme: "light",
    locale: "en",
    forceTheme: false,
    disableAnimations: false,
  },
  store: null,
  setState: (newState: any) => set((state) => ({ ...state, ...newState })),
  reset: () =>
    set(() => ({
      user: {
        id: "",
        username: "",
        image: "",
      },
      setting: {
        theme: "light",
        locale: "en",
        forceTheme: false,
        disableAnimations: false,
      },
      store: null,
    })),
}));

type State = {
  user: {
    id: string;
    username: string;
    image: string;
  };
  setting: {
    theme: Theme;
    locale: Locale;
    forceTheme: boolean;
    disableAnimations: boolean;
  };
  store: {
    id: string;
    name: string;
    image: string;
  } | null;
};

type Actions = {
  setState: (newState: State) => void;
  reset: () => void;
};
