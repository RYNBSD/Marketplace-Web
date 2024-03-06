"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import useIsSignIn from "./useIsSignIn";

export default function useIsSeller() {
  const router = useRouter();
  const locale = useLocale();
  const { user } = useIsSignIn()!;

  if (user?.seller === null) {
    router.push(`/${locale}/sellers/new`);
    return { user: null };
  }
  return { user };
}
