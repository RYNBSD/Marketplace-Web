"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useCallback, useState, useTransition } from "react";
import { updateSeller } from "~/action/store";
import { validateStoreName } from "~/action/validate";
import { SubmitButton } from "~/components";
import { useSeller } from "~/hooks";

export function Name() {
  const t = useTranslations("");
  const tForm = useTranslations("Dashboard.Store.Update.Form");
  const [isValid, setIsValid] = useState(true);
  const [isPending, startTransition] = useTransition();
  const store = useSeller((state) => state.store);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      startTransition(() => {
        const value = e.target.value;

        validateStoreName(value).then(({ success }) =>
          setIsValid(success || value === store.name)
        );
      }),
    [store.name]
  );

  return (
    <>
      <input
        defaultValue={store.name}
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
  const tForm = useTranslations("Dashboard.Store.Update.Form")
  const locale = useLocale();
  const router = useRouter();
  const seller = useSeller((state) => state);

  const update = useCallback(
    async (formData: FormData) => {
      const res = await updateSeller(formData);
      if (res.success) {
        seller.setState({ ...seller, ...(res.data as any) });
        router.push(`/${locale}/dashboard/store`);
      }
      return res;
    },
    [locale, router, seller]
  );

  return (
    <SubmitButton
      className="btn btn-primary"
      content={tForm("update")}
      action={update}
    />
  );
}
