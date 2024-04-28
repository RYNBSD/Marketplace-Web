"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { deleteStore } from "~/api/store";
import { KEYS } from "~/constant";
import { useUser } from "~/hooks";

const { BASE_URL } = KEYS;

export function Img() {
  const { store } = useUser((state) => state);
  return (
    store?.image && (
      <Image
        src={`${BASE_URL}${store.image}`}
        alt={store.name}
        width={128}
        height={128}
        priority
        className="w-32 h-32 object-cover rounded-full"
      />
    )
  );
}

export function Name() {
  const tProfile = useTranslations("Dashboard.Store.Profile");
  const { store } = useUser((state) => state);
  return (
    <input
      disabled
      type="text"
      name="name"
      className="grow"
      placeholder={tProfile("name")}
      value={store?.name ?? ""}
    />
  );
}

export function DeleteBtn() {
  const router = useRouter();
  const locale = useLocale();
  const tProfile = useTranslations("Dashboard.Store.Profile");
  const { setState, user, setting } = useUser((state) => state);

  const onClick = useCallback(async () => {
    const res = await deleteStore();
    if (!res.ok) return;

    setState({ user, setting, store: null });
    router.push(`/${locale}/profile`);
  }, [locale, router, setState, setting, user]);

  return (
    <button
      type="button"
      className="btn btn-error capitalize"
      onClick={onClick}
    >
      {tProfile("delete")}
    </button>
  );
}
