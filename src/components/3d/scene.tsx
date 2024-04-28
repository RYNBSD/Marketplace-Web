"use client";

import type { FC } from "react";
import { memo, Suspense } from "react";
import { Center, Html, Resize, Stage, useProgress } from "@react-three/drei";
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

const Scene: FC<Props> = ({ model, xr }) => {
  return (
    <Center>
      <Stage preset="rembrandt" intensity={1} adjustCamera shadows>
        <Resize width height={xr}>
          <Suspense fallback={<Loader />}>
            <Model model={model} />
          </Suspense>
        </Resize>
      </Stage>
    </Center>
  );
};

Scene.propTypes = {
  model: PropTypes.string.isRequired,
  xr: PropTypes.bool.isRequired,
};

type Props = {
  model: string;
  xr: boolean;
};

export default memo(Scene);
