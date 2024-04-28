"use client";
import type { ReactNode } from "react";
import type { LocalStorage } from "~/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { KEYS } from "~/constant";
import { patchSetting } from "~/api/user";

const SettingContext = createContext<TSettingContext | null>(null);
const { BROWSER, COOKIE } = KEYS;

export default function SittingProvider({ children }: Props) {
  const [_, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const [setting, setSetting] = useState<LocalSetting>({
    theme: "light",
    forceTheme: false,
    disableAnimations: false,
    locale: "en",
  });

  useEffect(() => {
    const localSetting =
      localStorage.getItem(BROWSER.LOCALE_STORAGE.SETTING) ?? "";
    if (localSetting.length === 0) return;

    const setting = JSON.parse(localSetting) as LocalSetting;
    setSetting(setting);
    Cookies.set(COOKIE.THEME, setting.theme);

    // Compare locale storage setting(locale) with the current pathname and redirect if there are not the same
    if (pathname.startsWith("/en") && setting.locale === "ar") {
      const newPathName = pathname.replace("/en", "/ar");
      router.push(newPathName);
    } else if (pathname.startsWith("/ar") && setting.locale === "en") {
      const newPathName = pathname.replace("/ar", "/en");
      router.push(newPathName);
    }
  }, [pathname, router]);

  useUpdateEffect(() => {
    const html = document.querySelector("html")!;
    const DATA_THEME = "data-theme";
    html.setAttribute(DATA_THEME, Cookies.get(COOKIE.THEME) ?? setting.theme);
  }, [setting.theme]);

  const changeSetting = useCallback(
    async <K extends SettingKeys = SettingKeys>(
      key: K,
      value: LocalSetting[K]
    ) => {
      startTransition(() => {
        const newSetting = { ...setting, [key]: value };
        patchSetting(newSetting).then(() => {
          setSetting(newSetting);

          if (key === "theme") Cookies.set(COOKIE.THEME, `${value}`);

          const stringify = JSON.stringify(newSetting);
          localStorage.setItem(BROWSER.LOCALE_STORAGE.SETTING, stringify);
        });
      });
    },
    [setSetting, setting]
  );

  const refresh = useCallback((setting: LocalSetting) => {
    const stringify = JSON.stringify(setting);
    localStorage.setItem(BROWSER.LOCALE_STORAGE.SETTING, stringify);
    setSetting(setting);
    Cookies.set(COOKIE.THEME, setting.theme);
  }, []);

  return (
    <SettingContext.Provider
      value={{
        setting,
        changeSetting,
        refresh,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}

type LocalSetting = LocalStorage["setting"];
type SettingKeys = keyof LocalSetting;

type TSettingContext = {
  setting: LocalSetting;
  changeSetting: <K extends keyof LocalSetting>(
    key: K,
    value: LocalSetting[K]
  ) => void;
  refresh: (setting: LocalSetting) => void;
};

type Props = {
  children: ReactNode;
};

export const useSetting = () => useContext(SettingContext);
