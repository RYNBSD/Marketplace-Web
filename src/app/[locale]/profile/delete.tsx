"use client";

import { useTranslations } from "next-intl";
import { useUser } from "~/context";

export default function Delete() {
  const tInfo = useTranslations("Profile.Info")
  const { remove } = useUser()!;
  return (
    <button className="btn btn-error" type="button" onClick={remove}>
      {tInfo("delete")}
    </button>
  );
}
