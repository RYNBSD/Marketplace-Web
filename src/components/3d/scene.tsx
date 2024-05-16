"use client";

import type { FC } from "react";
import { memo, Suspense } from "react";
import { Html, Resize, Stage, useProgress } from "@react-three/drei";
import PropTypes from "prop-types";
import Model from "./model";
import { useXR } from "@react-three/xr";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <progress className="progress w-56" value={progress} max="100" />
    </Html>
  );
}

const Scene: FC<Props> = ({ model }) => {
  const { isPresenting } = useXR();
  return (
    <Suspense fallback={<Loader />}>
      <Stage
        preset="rembrandt"
        intensity={1}
        adjustCamera
        environment="apartment"
        shadows
      >
        {isPresenting ? (
          <Model model={model} />
        ) : (
          <Resize width>
            <Model model={model} />
          </Resize>
        )}
      </Stage>
    </Suspense>
  );
};

Scene.propTypes = {
  model: PropTypes.string.isRequired,
};

type Props = {
  model: string;
};

export default memo(Scene);
