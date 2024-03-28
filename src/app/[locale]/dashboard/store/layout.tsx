"use client"
import { useLayoutEffect, type ReactNode } from "react"

export default function StoreLayout({ children }: Props) {
  useLayoutEffect(() => {
  }, [])
  return children
}

type Props = {
  children: ReactNode
}