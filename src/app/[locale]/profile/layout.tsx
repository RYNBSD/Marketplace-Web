"use client"
import { useLayoutEffect, type ReactNode } from "react";
import { isAuthenticated } from "~/action/auth"
import { useUser } from "~/context";

export default function ProfileLayout({ children }: Props) {
  const { user } = useUser()!;
  useLayoutEffect(() => {
    isAuthenticated()
  }, [user])
  return children
}

type Props = {
  children: ReactNode
}