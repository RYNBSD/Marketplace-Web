"use server"
import type { ReactNode } from "react"
import { notAuthenticated } from "~/action/auth"

export default async function AuthLayout({ children }: Props) {
  await notAuthenticated()
  return children
}

type Props = {
  children: ReactNode
}