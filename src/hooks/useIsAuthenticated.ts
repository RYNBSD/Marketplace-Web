"use client";
import { useRouter } from "next/navigation";
import { useUser } from "~/context";

export function useIsAuthenticated() {
  const router = useRouter();

  const { user } = useUser()!;
  if (user === null) router.back();
}
