import { create } from "zustand";

export const useSearch = create<State & Actions>((set) => ({
  search: "",
  stores: [],
  categories: [],
  products: [],
  setState: (s: any) => set(state => ({ ...state, ...s })),
  setSearch: (search: string) => set(() => ({ search })),
}));

type State = {
  search: string;
  stores: any[]
  categories: any[]
  products: any[]
};

type Actions = {
  setState: (s: any) => void
  setSearch: (search: string) => void;
};
