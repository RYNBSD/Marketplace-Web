import type { MeshProps } from "@react-three/fiber";
import { create } from "zustand";

export const useModel = create<State & Action>((set) => ({
  setState: (s: State) =>
    set((prev) => ({ ...prev, state: { ...prev.state, ...s } })),
}));

type State = { state?: MeshProps };
type Action = { setState: (s: MeshProps) => void };
