"use client";
import type { FC } from "react";
import { useMemo, Suspense, memo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  useProgress,
  Resize,
  Center,
  Stage,
  Html,
  Preload,
  Stats,
} from "@react-three/drei";
import { ARButton, XR } from "@react-three/xr";
import PropTypes from "prop-types";
import Model from "./model";
import { useIsMobile } from "~/hooks";
import { useSetting } from "~/context";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <progress className="progress w-56" value={progress} max="100" />
    </Html>
  );
}

const Canvas3D: FC<Props> = ({ model, ar = false }) => {
  const [isClient, setIsClient] = useState(false);
  const { setting } = useSetting()!;
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scene = useMemo(
    () => (
      <Stage preset="rembrandt" intensity={1} adjustCamera shadows>
        <Resize width>
          <Model model={model} />
          <Preload all />
        </Resize>
      </Stage>
    ),
    [model]
  );

  const arButton = useMemo(
    () => (isMobile && ar ? <ARButton /> : null),
    [ar, isMobile]
  );
  const arScene = useMemo(
    () => (isMobile ? <XR>{scene}</XR> : scene),
    [isMobile, scene]
  );

  return isClient ? (
    <Suspense fallback={null}>
      <Stats />
      {arButton}
      <Canvas shadows frameloop="demand">
        <OrbitControls
          autoRotate={!setting.disableAnimations && !ar} // Auto-rotate the model
          enableZoom={true} // Enable zoom
          maxPolarAngle={Math.PI / 2} // Limit the angle to prevent flipping
          minPolarAngle={0} // Limit the angle to prevent flipping
          minDistance={1} // Limit the minimum distance of zoom
          maxDistance={10} // Limit the maximum distance of zoom
        />
        <PerspectiveCamera makeDefault position={[0, 1, 2.5]} />
        <Center>
          <Suspense fallback={<Loader />}>{ar ? arScene : scene}</Suspense>
        </Center>
      </Canvas>
    </Suspense>
  ) : (
    <></>
  );
};

Canvas3D.propTypes = {
  model: PropTypes.string.isRequired,
  ar: PropTypes.bool,
};

export default memo(Canvas3D);

type Props = {
  model: string;
  ar?: boolean;
};
