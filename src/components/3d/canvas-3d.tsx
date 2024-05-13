"use client";

import { Suspense, memo, type FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, Stats } from "@react-three/drei";
import { ARButton } from "@react-three/xr";
import PropTypes from "prop-types";
import { useIsMobile } from "~/hooks";
import XR from "./xr/canvas";
import Camera from "./camera";
import Scene from "./scene";

function Loading() {
  return (
    <div className="w-full h-full grid place-content-center">
      <span className="loading loading-spinner text-neutral"></span>
    </div>
  );
}

const Canvas3D: FC<Props> = ({ model }) => {
  const isMobile = useIsMobile();

  return (
    <Suspense fallback={<Loading />}>
      {!isMobile && <Stats />}
      {isMobile && (
        <ARButton sessionInit={{ requiredFeatures: ["hit-test"] }} />
      )}
      <Canvas shadows frameloop="demand">
        <XR>
          <Camera />
          <Scene model={model} />
        </XR>
        <Preload all />
      </Canvas>
    </Suspense>
  );
};

Canvas3D.propTypes = {
  model: PropTypes.string.isRequired,
};

type Props = {
  model: string;
};

export default memo(Canvas3D);
