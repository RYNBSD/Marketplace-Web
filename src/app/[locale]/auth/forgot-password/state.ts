"use client";
import { create } from "zustand";

export const useForm = create<State & Actions>((set) => ({
  disableEmail: false,
  disableCode: true,
  toggleEmail: () =>
    set((state) => ({ ...state, disableEmail: !state.disableEmail })),
  toggleCode: () =>
    set((state) => ({ ...state, disableCode: !state.disableCode })),
  setState: (newState: State) => set((state) => ({ ...state, ...newState })),
}));

type State = {
  disableEmail: boolean;
  disableCode: boolean;
};

type Actions = {
  toggleEmail: () => void;
  toggleCode: () => void;
  setState: (newState: State) => void;
};
