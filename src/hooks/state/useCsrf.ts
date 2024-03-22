import { create } from "zustand";

type State = {
  csrf: string;
};

type Action = {
  create: (csrf: string) => void;
  remove: () => void;
};

export const useCsrf = create<State & Action>((set) => ({
  csrf: "",
  create: (csrf: string) => set({ csrf }),
  remove: () => set({ csrf: "" }),
}));
