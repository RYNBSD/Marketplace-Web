import { create } from "zustand";

export const useSearch = create<State & Actions>((set) => ({
  stores: [],
  categories: [],
  products: [],
  setState: (s: any) => set((state) => ({ ...state, ...s })),
}));

type State = {
  stores: any[];
  categories: any[];
  products: any[];
};

type Actions = {
  setState: (s: any) => void;
};
