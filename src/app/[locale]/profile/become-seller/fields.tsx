"use client";

import type { ChangeEvent } from "react";
import type { Theme } from "~/types";
import { useCallback, useEffect, useState, useTransition } from "react";
import { THEMES } from "~/constant";
import { useSetting } from "~/context";
import { validateStoreName } from "~/action/validate";
import { useTranslations } from "next-intl";

export function Name() {
  const t = useTranslations();
  const tValidating = useTranslations("Profile.Become-Seller.Form");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      validateStoreName(e.target.value)
        .then(({ success }) => setIsNameValid(success))
        .catch(() => setIsNameValid(false));
    });
  }, []);

  return (
    <>
      <input
        required
        type="text"
        name="name"
        placeholder="Store name"
        className={`input input-bordered ${
          isNameValid ? "input-success" : "input-error"
        }`}
        onChange={onNameChange}
      />
      <div className="label">
        <span className="label-text-alt">
          {isPending
            ? t("validating")
            : isNameValid
            ? tValidating("store-valid")
            : tValidating("store-not-valid")}
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
