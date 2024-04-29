import { create } from "zustand";

export const useState = create<State & Actions>((set) => ({
  is3D: false,
  toggle3D: () => set((state) => ({ ...state, is3D: !state.is3D })),
  setState: (newState) => set((state) => ({ ...state, ...newState })),
}));

type State = {
  is3D: boolean;
};

type Actions = {
  toggle3D: () => void;
  setState: (newState: State) => void;
};
