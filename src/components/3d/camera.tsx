"use client";

import { memo, type FC } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import PropTypes from "prop-types";
import { useSetting } from "~/context";

const Camera: FC<Props> = ({ xr }) => {
  const { setting } = useSetting()!;

  return (
    <>
      <OrbitControls
        autoRotate={!setting.disableAnimations && !xr} // Auto-rotate the model
        enableZoom={true} // Enable zoom
        maxPolarAngle={Math.PI / 2} // Limit the angle to prevent flipping
        minPolarAngle={0} // Limit the angle to prevent flipping
        minDistance={1} // Limit the minimum distance of zoom
        maxDistance={10} // Limit the maximum distance of zoom
      />
      <PerspectiveCamera makeDefault position={[0, 1, 2.5]} />
    </>
  );
};

Camera.propTypes = {
  xr: PropTypes.bool.isRequired,
};

type Props = {
  xr: boolean;
};

export default memo(Camera);
