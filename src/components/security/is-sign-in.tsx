"use client";
import type { ReactNode } from "react";
import { useIsSignIn } from "~/hooks";

export default function IsSignIn({ children }: Props) {
  const { user } = useIsSignIn();
  return user !== null ? children : null;
}

type Props = {
  children: ReactNode;
};
