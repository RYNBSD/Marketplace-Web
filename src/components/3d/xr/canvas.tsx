"use client";

import type { ReactNode } from "react";
import { XR as XRCanvas } from "@react-three/xr";
// import Hit from "./hit";

export default function XR({ children }: Props) {
  return (
    <XRCanvas>
      {/* <Hit /> */}
      {children}
    </XRCanvas>
  );
}

type Props = {
  children: ReactNode;
};
