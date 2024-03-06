"use client";
import type { ReactNode } from "react";
import { useIsSignOut } from "~/hooks";

export default function IsSignOut({ children }: Props) {
  useIsSignOut();
  return children;
}

type Props = {
  children: ReactNode;
};
