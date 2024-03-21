import type { ReactNode } from "react"
import { isAuthenticated } from "~/action/auth"

export default async function ProfileLayout({ children }: Props) {
  await isAuthenticated()
  return children
}

type Props = {
  children: ReactNode
}