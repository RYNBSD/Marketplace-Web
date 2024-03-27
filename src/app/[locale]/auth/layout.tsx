"use client";
import { useLayoutEffect, type ReactNode } from "react";
import { notAuthenticated } from "~/action/auth";
import { useUser } from "~/context";

export default function AuthLayout({ children }: Props) {
  const { user } = useUser()!;
  useLayoutEffect(() => {
    notAuthenticated();
  }, [user]);
  return children;
}

type Props = {
  children: ReactNode;
};
