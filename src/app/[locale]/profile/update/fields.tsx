"use client";

import { useTranslations } from "next-intl";
import { SubmitButton } from "~/components";
import { useUser } from "~/context";

export function Username() {
  const tForm = useTranslations("Profile.Update.Form")
  const { user } = useUser()!;
  return (
    <input
      defaultValue={user?.username ?? ""}
      type="text"
      name="username"
      placeholder={tForm("username")}
      className="input input-bordered"
      required
    />
  );
}

export function Submit() {
  const tForm = useTranslations("Profile.Update.Form");
  const { update } = useUser()!;

  return (
    <SubmitButton
      className="btn btn-primary"
      content={tForm("update")}
      action={update!}
    />
  );
}
