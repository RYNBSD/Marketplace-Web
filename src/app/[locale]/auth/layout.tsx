"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useLayoutEffect, type ReactNode } from "react";
import { useUser } from "~/hooks";

/**
 * In auth section user must be not authentication
 * to prevent sign in duplication
 */
export default function AuthLayout({ children }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const { user } = useUser()

  useLayoutEffect(() => {
    if (user.id.length > 0)
      router.push(`/${locale}`)
  }, [locale, router, user.id.length]);

  return children;
}

type Props = {
  children: ReactNode;
};
