"use client";
import { memo, type ReactNode } from "react";
import { useState } from "./state";
import { useIsMobile } from "~/hooks";
import { Canvas3D } from "~/components";
import { KEYS } from "~/constant";

const { BASE_URL } = KEYS;

export const ThreeD = memo(function ThreeD({ model }: { model: string }) {
  const isMobile = useIsMobile();
  const { is3D, isAr, toggle3D, toggleAr } = useState((state) => state);

  return (
    is3D && (
      <>
        <div className="h-[250px] w-full">
          <Canvas3D ar={isAr} model={`${BASE_URL}${model}`} />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <button
            type="button"
            className="btn btn-info flex-1"
            onClick={toggle3D}
          >
            Images
          </button>
          <button
            type="button"
            className="btn btn-info flex-1"
            disabled={!isMobile}
            onClick={toggleAr}
          >
            AR
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
        <button type="button" className="btn btn-info" onClick={toggle3D}>
          3D
        </button>
      </>
    )
  );
}
