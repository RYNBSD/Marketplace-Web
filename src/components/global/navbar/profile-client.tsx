"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { KEYS } from "~/constant";
import { signOut } from "~/api/auth";
import { useUser } from "~/hooks";

const { BASE_URL, COOKIE } = KEYS;

export function Img() {
  const { user: { username, image } } = useUser((state) => state);

  return (
    <Image
      src={
        image.length === 0
          ? "/assets/images/blank-profile.webp"
          : `${BASE_URL}${image}`
      }
      alt={username ?? "Blank picture"}
      height={40}
      width={40}
      priority
      style={{ objectFit: "cover" }}
    />
  );
}

export function Menu() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const tProfile = useTranslations("Navbar.Profile");
  const { user: { id }, reset } = useUser(state => state);

  const onClick = useCallback(async () => {
    const res = await signOut();
    if (!res.ok) return;

    Cookies.remove(COOKIE.AUTHORIZATION);
    Cookies.remove(COOKIE.SESSION);
    reset()
    router.push(`/${locale}`);
  }, [locale, reset, router]);

  return id.length === 0 ? (
    <li>
      <Link href={`/${locale}/auth/sign-in`} className="justify-between">
        {t("sign-in")}
      </Link>
    </li>
  ) : (
    <>
      <li>
        <Link href={`/${locale}/profile`} className="justify-between">
          {tProfile("profile")}
        </Link>
      </li>
      <li>
        <Link href={`/${locale}/profile#settings`} className="justify-between">
          {tProfile("setting")}
        </Link>
      </li>
      <li>
        <button className="justify-between" type="button" onClick={onClick}>
          {tProfile("sign-out")}
        </button>
      </li>
    </>
  );
}
