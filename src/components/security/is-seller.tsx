"use client";
import type { ReactNode } from "react";
import { useIsSeller } from "~/hooks";

export default function IsSeller({ children }: Props) {
  const { user } = useIsSeller()!;
  return user !== null ? children : null;
}

type Props = {
  children: ReactNode;
};
