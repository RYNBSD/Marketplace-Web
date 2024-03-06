"use client";
import type { FC } from "react";
import { type MeshProps } from "@react-three/fiber";
import { memo } from "react";
import { useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";

const Model: FC<Props> = ({ model, ...props }) => {
  const { scene } = useGLTF(model);

  return (
    <mesh {...props} position={[0, 0, 0]} receiveShadow castShadow>
      <primitive object={scene} />
    </mesh>
  );
};

Model.propTypes = {
  model: PropTypes.string.isRequired,
  props: PropTypes.any,
};

export default memo(Model);

type Props = {
  model: string;
  props?: MeshProps;
};
