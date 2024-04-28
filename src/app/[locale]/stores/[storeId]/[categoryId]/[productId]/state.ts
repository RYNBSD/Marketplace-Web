import { create } from "zustand";

export const useState = create<State & Actions>((set) => ({
  is3D: false,
  isAr: false,
  toggle3D: () =>
    set((state) => ({ ...state, is3D: !state.is3D, isAr: state.is3D })),
  toggleAr: () =>
    set((state) => ({ ...state, isAr: !state.isAr, is3D: !state.isAr })),
  setState: (newState) => set((state) => ({ ...state, ...newState })),
}));

type State = {
  is3D: boolean;
  isAr: boolean;
};

type Actions = {
  toggle3D: () => void;
  toggleAr: () => void;
  setState: (newState: State) => void;
};
