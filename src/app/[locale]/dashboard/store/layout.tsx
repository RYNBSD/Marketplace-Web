"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useLayoutEffect, type ReactNode } from "react";
import { sellerProfile } from "~/api/store";

export default function StoreLayout({ children }: Props) {
  const locale = useLocale();
  const router = useRouter();

  useLayoutEffect(() => {
    sellerProfile().then((res) => {
      if (!res.ok) router.push(`/${locale}/profile`);
    });
  }, [locale, router]);

  return children;
}

type Props = {
  children: ReactNode;
};
