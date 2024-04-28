"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useCallback, useState, useTransition } from "react";
import { updateSeller } from "~/api/store";
import { validateStoreName } from "~/api/security";
import { SubmitButton } from "~/components";
import { useUser } from "~/hooks";

export function Name() {
  const t = useTranslations("");
  const tForm = useTranslations("Dashboard.Store.Update.Form");
  const [isValid, setIsValid] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { store } = useUser((state) => state);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      startTransition(() => {
        const value = e.target.value;
        validateStoreName(value).then((res) =>
          setIsValid(res.ok || value === store?.name)
        );
      });
    },
    [store?.name]
  );

  return (
    <>
      <input
        defaultValue={store?.name}
        type="text"
        name="name"
        placeholder={tForm("name")}
        onChange={onChange}
        className={`input input-bordered ${
          isValid ? "input-success" : "input-error"
        }`}
        required
      />
      <div className="label">
        <span className="label-text-alt">
          {isPending
            ? t("validating")
            : isValid
            ? tForm("store-valid")
            : tForm("store-not-valid")}
        </span>
      </div>
    </>
  );
}

export function Submit() {
  const tForm = useTranslations("Dashboard.Store.Update.Form");
  const locale = useLocale();
  const router = useRouter();
  const { user, setting, setState } = useUser((state) => state);

  const action = useCallback(
    async (formData: FormData) => {
      const res = await updateSeller(formData);
      if (!res.ok) return res;

      const json = await res.json();
      setState({ user, setting, store: json.data.store });
      router.push(`/${locale}/dashboard/store`);

      return res;
    },
    [locale, router, setState, setting, user]
  );

  return (
    <SubmitButton
      className="btn btn-primary"
      content={tForm("update")}
      action={action}
    />
  );
}
