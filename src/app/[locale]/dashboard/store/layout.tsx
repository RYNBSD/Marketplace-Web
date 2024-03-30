"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useLayoutEffect, type ReactNode } from "react";
import { sellerProfile } from "~/action/store";
import { useSeller } from "~/hooks";

export default function StoreLayout({ children }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const { setState } = useSeller((state) => state);

  useLayoutEffect(() => {
    const fetchProfile = async () => {
      const res = await sellerProfile();
      if (!res.success) router.push(`/${locale}`);
      else setState(res.data as any);
    };

    fetchProfile();
  }, [locale, router, setState]);

  return children;
}

type Props = {
  children: ReactNode;
};
