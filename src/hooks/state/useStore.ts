import { create } from "zustand";

type State = {
  id: string;
  name: string;
  image: string;
};

type Actions = {
  set: (arg: State) => void;
  unset: () => void;
};

export const useStore = create<State & Actions>((set) => ({
  id: "",
  name: "",
  image: "",
  set: (arg: State) => set(arg),
  unset: () => set({ id: "", name: "", image: "" }),
}));
