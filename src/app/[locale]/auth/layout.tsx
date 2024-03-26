"use client";
import type { ReactNode } from "react";
import { useLayoutEffect } from "react";
import { notAuthenticated } from "~/action/auth";

export default function AuthLayout({ children }: Props) {
  useLayoutEffect(() => {
    notAuthenticated();
  }, []);
  return children;
}

type Props = {
  children: ReactNode;
};
