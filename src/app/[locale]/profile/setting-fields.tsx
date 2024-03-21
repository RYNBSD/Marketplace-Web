"use client";

import type { Locale as TLocale, Theme as TTheme } from "~/types";
import { LOCALE, THEMES } from "~/constant";
import { useSetting } from "~/context";

export function Locale() {
  const { setting, changeSetting } = useSetting()!;
  return (
    <select
      onChange={(e) => changeSetting("locale", e.target.value as TLocale)}
      value={setting.locale}
      className="select select-bordered w-full max-w-xs"
    >
      {LOCALE.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
}

export function Theme() {
  const { setting, changeSetting } = useSetting()!;
  return (
    <select
      onChange={(e) => changeSetting("theme", e.target.value as TTheme)}
      value={setting.theme}
      className="select select-bordered w-full max-w-xs"
    >
      {[THEMES[0], THEMES[1]].map((theme) => (
        <option key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
}

export function DisableAnimations() {
  const { setting, changeSetting } = useSetting()!;
  return (
    <input
      type="checkbox"
      className="toggle toggle-primary"
      checked={setting.disableAnimations}
      onChange={(e) => changeSetting("disableAnimations", e.target.checked)}
    />
  );
}

export function ForceTheme() {
  const { setting, changeSetting } = useSetting()!;
  return (
    <input
      type="checkbox"
      className="toggle toggle-primary"
      checked={setting.forceTheme}
      onChange={(e) => changeSetting("forceTheme", e.target.checked)}
    />
  );
}
