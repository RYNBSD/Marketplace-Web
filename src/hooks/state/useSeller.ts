import { create } from "zustand";

export const useSeller = create<State & Actions>((set) => ({
  store: {
    name: "",
    image: "",
  },
  setting: {},
  count: {
    categories: 0,
    products: 0,
  },
  setState: (state: State) => set(state),
}));

type State = {
  store: {
    name: string;
    image: string;
  };
  setting: {};
  count: {
    categories: number;
    products: number;
  };
};

type Actions = {
  setState: (state: State) => void;
  // setDefault: () => void;
};
