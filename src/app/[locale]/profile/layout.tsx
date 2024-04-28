"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useLayoutEffect, type ReactNode } from "react";
import { isAuthenticated } from "~/api/auth";

/**
 * User must be authenticated
 */
export default function ProfileLayout({ children }: Props) {
  const locale = useLocale();
  const router = useRouter();

  useLayoutEffect(() => {
    isAuthenticated().then((res) => {
      if (!res.ok) router.push(`/${locale}/auth/sign-in`);
    });
  }, [locale, router]);

  return children;
}

type Props = {
  children: ReactNode;
};
