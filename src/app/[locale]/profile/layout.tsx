"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useLayoutEffect, type ReactNode } from "react";
import { isAuthenticated } from "~/action/auth";

/**
 * Use must be authenticated
 */
export default function ProfileLayout({ children }: Props) {
  const locale = useLocale();
  const router = useRouter();

  useLayoutEffect(() => {
    console.log(4);
    
    const checkAuthentication = async () => {
      const status = await isAuthenticated();
      if (!status) router.push(`/${locale}/auth/sign-in`);
    };
    checkAuthentication();
  }, [locale, router]);

  return children;
}

type Props = {
  children: ReactNode;
};
