"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { deleteStore } from "~/action/store";
import { KEYS } from "~/constant";
import { useNotification } from "~/context";
import { useSeller } from "~/hooks";

const { BASE_URL } = KEYS;

export function Img() {
  const store = useSeller((state) => state.store);

  return (
    <Image
      src={`${BASE_URL}${store.image || "/upload"}`}
      alt={store.name}
      width={128}
      height={128}
      priority
      className="w-32 h-32 object-cover rounded-full"
    />
  );
}

export function Name() {
  const tProfile = useTranslations("Dashboard.Store.Profile")
  const store = useSeller((state) => state.store);
  return (
    <input
      disabled
      type="text"
      name="name"
      className="grow"
      placeholder={tProfile("name")}
      value={store.name}
    />
  );
}

export function DeleteBtn() {
  const tProfile = useTranslations("Dashboard.Store.Profile")
  const { toastify } = useNotification()!;
  return (
    <button
      type="button"
      className="btn btn-error capitalize"
      onClick={() => toastify(deleteStore())}
    >
      {tProfile("delete")}
    </button>
  );
}
