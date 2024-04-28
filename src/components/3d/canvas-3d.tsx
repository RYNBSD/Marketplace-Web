"use client";

import { Suspense, memo, type FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, Stats } from "@react-three/drei";
import { ARButton, XR } from "@react-three/xr";
import PropTypes from "prop-types";
import { useIsMobile } from "~/hooks";
import Camera from "./camera";
import Scene from "./scene";

const Canvas3D: FC<Props> = ({ model, ar = false }) => {
  const isMobile = useIsMobile();

  return (
    <Suspense>
      {!isMobile && <Stats />}
      <ARButton>{(status) => `${status}`}</ARButton>
      <Canvas shadows frameloop="demand">
        <Camera xr={ar} />
        <XR referenceSpace="local">
          <Scene model={model} xr={ar} />
        </XR>
        <Preload all />
      </Canvas>
    </Suspense>
  );
};

Canvas3D.propTypes = {
  model: PropTypes.string.isRequired,
  ar: PropTypes.bool,
};

type Props = {
  model: string;
  ar?: boolean;
};

export default memo(Canvas3D);
