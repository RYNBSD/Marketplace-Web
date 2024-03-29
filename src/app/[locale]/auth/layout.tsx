"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useLayoutEffect, type ReactNode } from "react";
import { isAuthenticated } from "~/action/auth";

/**
 * In auth section user must be not authentication
 * to prevent sign in duplication
 */
export default function AuthLayout({ children }: Props) {
  const locale = useLocale();
  const router = useRouter();

  useLayoutEffect(() => {
    const checkAuthentication = async () => {
      const status = await isAuthenticated();
      if (status) router.push(`/${locale}`);
    };
    checkAuthentication();
  }, [locale, router]);

  return children;
}

type Props = {
  children: ReactNode;
};
