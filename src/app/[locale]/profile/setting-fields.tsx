"use client";

import type { Locale as TLocale, Theme as TTheme } from "~/types";
import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";
import { useSetting } from "~/context";
import { LOCALE, THEMES } from "~/constant";

const Option = memo(function Option({ value }: { value: string }) {
  return <option value={value}>{value}</option>;
});

export function Locale() {
  const router = useRouter();
  const { setting, changeSetting } = useSetting()!;

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      changeSetting("locale", value as TLocale);
      router.push(`/${value}/profile`);
    },
    [changeSetting, router]
  );

  return (
    <select
      onChange={onChange}
      value={setting.locale}
      className="select select-bordered w-full max-w-xs"
    >
      {LOCALE.map((locale) => (
        <Option key={locale} value={locale} />
      ))}
    </select>
  );
}

export function Theme() {
  const { setting, changeSetting } = useSetting()!;

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      changeSetting("theme", value as TTheme);
    },
    [changeSetting]
  );

  return (
    <select
      onChange={onChange}
      value={setting.theme}
      className="select select-bordered w-full max-w-xs"
    >
      {THEMES.map((theme) => (
        <Option key={theme} value={theme} />
      ))}
    </select>
  );
}

export function DisableAnimations() {
  const { setting, changeSetting } = useSetting()!;

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      changeSetting("disableAnimations", checked);
    },
    [changeSetting]
  );

  return (
    <input
      type="checkbox"
      className="toggle toggle-primary"
      checked={setting.disableAnimations}
      onChange={onChange}
    />
  );
}

export function ForceTheme() {
  const { setting, changeSetting } = useSetting()!;

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      changeSetting("forceTheme", checked);
    },
    [changeSetting]
  );

  return (
    <input
      type="checkbox"
      className="toggle toggle-primary"
      checked={setting.forceTheme}
      onChange={onChange}
    />
  );
}
