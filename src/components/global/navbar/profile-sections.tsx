"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { KEYS } from "~/constant";
import { useUser } from "~/context";

const { BASE_URL } = KEYS;

export function Img() {
  const { user } = useUser()!;

  return (
    <Image
      src={
        user === null
          ? "/assets/images/blank-profile.webp"
          : `${BASE_URL}${user.image}`
      }
      alt={user?.username ?? "Blank picture"}
      height={40}
      width={40}
      priority
      style={{ objectFit: "cover" }}
    />
  );
}
export function Menu() {
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const tProfile = useTranslations("Navbar.Profile");

  const { user, signOut } = useUser()!;

  return user === null ? (
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
        <button className="justify-between" type="button" onClick={signOut}>
          {tProfile("sign-out")}
        </button>
      </li>
    </>
  );
}
