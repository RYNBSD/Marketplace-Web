"use client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { KEYS } from "~/constant";
import { useUser } from "~/hooks";
import { deleteProfile } from "~/api/user";

const { BASE_URL, COOKIE } = KEYS;

export function Img() {
  const { user } = useUser();
  return (
    user.image.length > 0 && (
      <Image
        src={`${BASE_URL}${user.image}`}
        alt={user.username}
        width={128}
        height={128}
        priority
        className="w-32 h-32 object-cover rounded-full"
      />
    )
  );
}

export function Username() {
  const { user } = useUser();
  return (
    <input
      type="text"
      value={user.username}
      disabled
      className="grow"
      placeholder="username"
    />
  );
}

export function DeleteBtn() {
  const { reset } = useUser()
  const locale = useLocale()
  const router = useRouter()
  const tInfo = useTranslations("Profile.Info");

  const onClick = useCallback(async () => {
    const res = await deleteProfile()
    if (!res.ok) return res

    reset()
    Cookies.remove(COOKIE.AUTHORIZATION)
    Cookies.remove(COOKIE.SESSION)
    router.push(`/${locale}`)
  }, [locale, reset, router])

  return (
    <button className="btn btn-error capitalize" type="button" onClick={onClick}>
      {tInfo("delete")}
    </button>
  );
}

export function StoreBtn() {
  const { store } = useUser(state => state)
  const locale = useLocale();
  const tInfo = useTranslations("Profile.Info");

  return (
    <Link
      href={`/${locale}/${
        store !== null ? `dashboard/store` : "profile/become-seller"
      }`}
      className="btn"
    >
      {store !== null ? tInfo("go-to-dashboard") : tInfo("become-a-seller")}
    </Link>
  );
}
