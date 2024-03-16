"use client";
import type { ReactNode } from "react";
import type { LocalStorage } from "~/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { KEYS } from "~/constant";

const SettingsContext = createContext<TSettingContext | null>(null);
const { SETTING } = KEYS.BROWSER.LOCALE_STORAGE;

export default function SittingProvider({ children }: Props) {
  const [setting, setSetting] = useState<LocalSetting>({
    theme: "light",
    forceTheme: false,
    disableAnimations: false,
    locale: "en",
  });

  useEffect(() => {
    try {
      const localSetting = localStorage.getItem(SETTING) ?? "";
      if (localSetting.length === 0) return;
      const setting = JSON.parse(localSetting) as LocalSetting;
      setSetting(setting);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const html = document.querySelector("html")!;
    const DATA_THEME = "data-theme";
    html.setAttribute(DATA_THEME, setting.theme);
  }, [setting.theme]);

  const changeSetting = useCallback(
    <K extends SettingKeys = SettingKeys>(key: K, value: LocalSetting[K]) => {
      const newSetting = { ...setting, [key]: value };
      setSetting(newSetting);
      const stringify = JSON.stringify(newSetting);
      localStorage.setItem(SETTING, stringify);
    },
    [setting]
  );

  return (
    <SettingsContext.Provider
      value={{
        setting,
        changeSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
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
};

type Props = {
  children: ReactNode;
};

export const useSettings = () => useContext(SettingsContext);
