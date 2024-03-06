"use client";
import type { FC } from "react";
import { useMemo, Suspense, memo } from "react";
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
} from "@react-three/drei";
import { ARButton, XR } from "@react-three/xr";
import PropTypes from "prop-types";
import Model from "./model";
import { useIsMobile } from "~/hooks";
import { useSettings } from "~/context";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <progress className="progress w-56" value={progress} max="100" />
    </Html>
  );
}

const Canvas3D: FC<Props> = ({ model, ar = false }) => {
  const { settings } = useSettings()!;
  const isMobile = useIsMobile();
  const scene = useMemo(
    () => (
      <>
        <OrbitControls
          autoRotate={!settings.disableAnimations} // Auto-rotate the model
          enableZoom={true} // Enable zoom
          maxPolarAngle={Math.PI / 2} // Limit the angle to prevent flipping
          minPolarAngle={0} // Limit the angle to prevent flipping
          minDistance={1} // Limit the minimum distance of zoom
          maxDistance={10} // Limit the maximum distance of zoom
        />
        <PerspectiveCamera makeDefault position={[0, 1, 2.5]} />
        <Center>
          <Stage
            environment="studio"
            preset="rembrandt"
            intensity={1}
            adjustCamera
            shadows
          >
            <Resize width>
              <Suspense fallback={<Loader />}>
                <Model model={model} />
                <Preload all />
              </Suspense>
            </Resize>
          </Stage>
        </Center>
      </>
    ),
    [model, settings.disableAnimations]
  );
  const arScene = useMemo(() => <XR>{scene}</XR>, [scene]);

  return (
    <div className="w-full h-screen">
      {ar && isMobile ? <ARButton /> : null}
      <Canvas shadows frameloop="demand">
        {ar && isMobile ? arScene : scene}
      </Canvas>
    </div>
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
