"use client";

import { ReactNode/* , useLayoutEffect */ } from "react";
// import Cookies from "js-cookie"
// import { useRouter } from "next/navigation";
// import { useLocale } from "next-intl";

export default function AdminLayout({ children }: Props) {
  // const locale = useLocale()
  // const router = useRouter()

  // useLayoutEffect(() => {
  //   const isAdmin = Cookies.get("admin") ?? ""
  //   if (isAdmin !== "1") router.push(`/${locale}`)
  // }, [locale, router]);

  return children;
}

type Props = {
  children: ReactNode;
};
