import { create } from "zustand";

export const useUser = create<State & Actions>(set => ({
  user: {
    username: "",
    image: "",
  },
  setting: {},
  setState: (state: State) => set(state)
}));

type State = {
  user: {
    username: string
    image: string
  }
  setting: {
    
  }
};

type Actions = {
  setState: (state: State) => void
};
