"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export default function Confetti() {
  const router = useRouter();
  const locale = useLocale();
  const [recycle, setRecycle] = useState(true);

  useEffect(() => {
    const recycleTimeout = setTimeout(() => {
      setRecycle(false);
    }, 3000);
    const redirectTimeout = setTimeout(() => {
      router.push(`/${locale}/auth/sign-in`);
    }, 5000);
    return () => {
      clearTimeout(recycleTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [locale, router]);

  return <ReactConfetti className="w-full h-full" recycle={recycle} />;
}
