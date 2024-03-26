"use client";
import type { ReactNode } from "react";
import { useLayoutEffect } from "react";
import { isAuthenticated } from "~/action/auth";

export default function ProfileLayout({ children }: Props) {
  useLayoutEffect(() => {
    isAuthenticated();
  }, []);
  return children;
}

type Props = {
  children: ReactNode;
};
