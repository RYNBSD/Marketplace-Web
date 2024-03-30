"use client";

import type { Locale as TLocale, Theme as TTheme } from "~/types";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useSetting } from "~/context";
import { LOCALE, THEMES } from "~/constant";

export function Locale() {
  const router = useRouter();
  const locale = useLocale();
  const [_, startTransition] = useTransition();
  const { setting, changeSetting } = useSetting()!;

  return (
    <select
      onChange={(e) =>
        startTransition(() => {
          changeSetting("locale", e.target.value as TLocale);
          router.push(`/${e.target.value}/profile`);
        })
      }
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
  const [_, startTransition] = useTransition();
  const { setting, changeSetting } = useSetting()!;
  return (
    <select
      onChange={(e) =>
        startTransition(() => changeSetting("theme", e.target.value as TTheme))
      }
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
  const [_, startTransition] = useTransition();
  const { setting, changeSetting } = useSetting()!;
  return (
    <input
      type="checkbox"
      className="toggle toggle-primary"
      checked={setting.disableAnimations}
      onChange={(e) =>
        startTransition(() =>
          changeSetting("disableAnimations", e.target.checked)
        )
      }
    />
  );
}

export function ForceTheme() {
  const [_, startTransition] = useTransition();
  const { setting, changeSetting } = useSetting()!;
  return (
    <input
      type="checkbox"
      className="toggle toggle-primary"
      checked={setting.forceTheme}
      onChange={(e) =>
        startTransition(() => changeSetting("forceTheme", e.target.checked))
      }
    />
  );
}
