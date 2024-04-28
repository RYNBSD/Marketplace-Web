"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { updateProfile } from "~/api/user";
import { SubmitButton } from "~/components";
import { useUser } from "~/hooks";

export function Username() {
  const tForm = useTranslations("Profile.Update.Form");
  const { user } = useUser((state) => state);
  return (
    <input
      defaultValue={user.username}
      type="text"
      name="username"
      placeholder={tForm("username")}
      className="input input-bordered"
      required
    />
  );
}

export function Submit() {
  const locale = useLocale();
  const router = useRouter();
  const tForm = useTranslations("Profile.Update.Form");
  const { setting, store, setState } = useUser((state) => state);

  const action = useCallback(async (formData: FormData) => {
    const res = await updateProfile(formData);
    if (!res.ok) return res;

    const json = await res.json()
    setState({ user: json.data.user, setting, store })
    router.push(`/${locale}/profile`);

    return res;
  }, [locale, router, setState, setting, store]);

  return (
    <SubmitButton
      className="btn btn-primary"
      content={tForm("update")}
      action={action!}
    />
  );
}
