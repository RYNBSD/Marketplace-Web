"use client";

import { useTranslations } from "next-intl";
import { SubmitButton } from "~/components";
import { useUser } from "~/context";

export function Username() {
  const { user } = useUser()!;
  return (
    <input
      defaultValue={user?.username ?? ""}
      type="text"
      name="username"
      placeholder="Username"
      className="input input-bordered"
      required
    />
  );
}

export function Submit() {
  const tSubmit = useTranslations("Profile.Update.Form");
  const { update } = useUser()!;

  return (
    <SubmitButton
      className="btn btn-primary"
      content={tSubmit("update")}
      action={update!}
    />
  );
}
