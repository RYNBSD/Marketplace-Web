"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useUser } from "../context";

// Check if user is sign in (authorization)
export default function useIsSignIn() {
  const router = useRouter();
  const locale = useLocale();
  const { user } = useUser()!;

  if (user === null) {
    router.push(`/${locale}/auth/sign-in`);
    return { user: null };
  }

  return { user };
}
