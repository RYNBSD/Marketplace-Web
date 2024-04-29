"use client";

import type { FC } from "react";
import { memo, Suspense } from "react";
import { Center, Html, Stage, useProgress } from "@react-three/drei";
import PropTypes from "prop-types";
import Model from "./model";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <progress className="progress w-56" value={progress} max="100" />
    </Html>
  );
}

const Scene: FC<Props> = ({ model }) => {
  return (
    <Center>
      <Stage
        preset="rembrandt"
        intensity={1}
        adjustCamera
        environment="apartment"
        shadows
      >
        <Suspense fallback={<Loader />}>
          <Model model={model} />
        </Suspense>
      </Stage>
    </Center>
  );
};

Scene.propTypes = {
  model: PropTypes.string.isRequired,
};

type Props = {
  model: string;
};

export default memo(Scene);
