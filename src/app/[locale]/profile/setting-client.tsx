"use client";

import type { Locale as TLocale, Theme as TTheme } from "~/types";
import type { ChangeEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useSetting } from "~/context";

export function Locale({ children }: { children: ReactNode }) {
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
      {children}
    </select>
  );
}

export function Theme({ children }: { children: ReactNode }) {
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
      {children}
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
