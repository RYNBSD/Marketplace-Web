"use client";

import type { ChangeEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useState, useTransition } from "react";
import { validateStoreName } from "~/api/security";
import { SubmitButton } from "~/components";
import { becomeSeller } from "~/api/user";
import { useRouter } from "next/navigation";
import { useUser } from "~/hooks";

export function Name() {
  const t = useTranslations();
  const tForm = useTranslations("Profile.Become-Seller.Form");
  const [isValid, setIsValid] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      validateStoreName(e.target.value).then((res) => setIsValid(res.ok));
    });
  }, []);

  return (
    <>
      <input
        required
        type="text"
        name="name"
        placeholder={tForm("name")}
        className={`input input-bordered ${
          isValid ? "input-success" : "input-error"
        }`}
        onChange={onChange}
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
  const locale = useLocale();
  const router = useRouter();
  const tForm = useTranslations("Profile.Become-Seller.Form");
  const { user, setting, setState } = useUser((state) => state);

  const action = useCallback(
    async (formData: FormData) => {
      const res = await becomeSeller(formData);
      if (!res.ok) return res;

      const json = await res.json();
      setState({ user, setting, store: json.data.store });
      router.push(`/${locale}/profile`);

      return res;
    },
    [locale, router, setState, setting, user]
  );

  return (
    <SubmitButton
      className="btn btn-primary"
      content={tForm("become-seller")}
      action={action}
    />
  );
}
