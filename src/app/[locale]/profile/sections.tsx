"use client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "~/context";
import { KEYS } from "~/constant";
import { useEffect, useState } from "react";
import { sellerProfile } from "~/action/store";

const { BASE_URL } = KEYS;

export function Img() {
  const { user } = useUser()!;

  return (
    <Image
      src={`${BASE_URL}${user?.image ?? "/upload"}`}
      alt={user?.username ?? ""}
      width={128}
      height={128}
      priority
      className="w-32 h-32 object-cover rounded-full"
    />
  );
}

export function Username() {
  const { user } = useUser()!;
  return (
    <input
      type="text"
      value={user?.username ?? ""}
      disabled
      className="grow"
      placeholder="username"
    />
  );
}

export function DeleteBtn() {
  const tInfo = useTranslations("Profile.Info");
  const { remove } = useUser()!;
  return (
    <button className="btn btn-error capitalize" type="button" onClick={remove}>
      {tInfo("delete")}
    </button>
  );
}

export function StoreBtn() {
  const locale = useLocale();
  const tInfo = useTranslations("Profile.Info");
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    sellerProfile().then(({ success }) => setIsSeller(success));
  }, []);

  return (
    <Link
      href={`/${locale}/${
        isSeller ? `dashboard/store` : "profile/become-seller"
      }`}
      className="btn"
    >
      {isSeller ? tInfo("go-to-dashboard") : tInfo("become-a-seller")}
    </Link>
  );
}
