"use client";
import { memo, type ReactNode } from "react";
import { useState } from "./state";
import { Canvas3D } from "~/components";
import { KEYS } from "~/constant";

const { BASE_URL } = KEYS;

export const ThreeD = memo(function ThreeD({ model }: { model: string }) {
  const { is3D, toggle3D } = useState((state) => state);

  return (
    is3D && (
      <>
        <div className="h-[250px] w-full">
          <Canvas3D model={`${BASE_URL}${model}`} />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <button
            type="button"
            className="btn btn-neutral btn-wide"
            onClick={toggle3D}
          >
            Images
          </button>
        </div>
      </>
    )
  );
});

export function Images({ children }: { children: ReactNode }) {
  const { is3D, toggle3D } = useState((state) => state);
  return (
    !is3D && (
      <>
        {children}
        <button
          type="button"
          className="btn btn-neutral btn-wide"
          onClick={toggle3D}
        >
          3D
        </button>
      </>
    )
  );
}
