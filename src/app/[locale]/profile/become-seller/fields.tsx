"use client";

import type { ChangeEvent } from "react";
import type { Theme } from "~/types";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState, useTransition } from "react";
import { THEMES } from "~/constant";
import { useSetting, useUser } from "~/context";
import { validateStoreName } from "~/action/validate";
import { SubmitButton } from "~/components";

export function Name() {
  const t = useTranslations();
  const tForm = useTranslations("Profile.Become-Seller.Form");
  const [isValid, setIsValid] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      startTransition(() => {
        validateStoreName(e.target.value)
          .then(({ success }) => setIsValid(success))
          .catch(() => setIsValid(false));
      }),
    []
  );

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

export function Themes() {
  const { setting, changeSetting } = useSetting()!;

  useEffect(() => {
    const originalTheme = setting.theme;
    return () => {
      changeSetting("theme", originalTheme);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <select
      name="theme"
      defaultValue={setting.theme}
      onChange={(e) => changeSetting("theme", e.target.value as Theme)}
      className="select select-bordered w-full max-w-xs"
    >
      {THEMES.map((theme) => (
        <option key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
}

export function Submit() {
  const tForm = useTranslations("Profile.Become-Seller.Form");
  const { becomeSeller } = useUser()!;

  return (
    <SubmitButton
      className="btn btn-primary"
      content={tForm("become-seller")}
      action={becomeSeller}
    />
  );
}
