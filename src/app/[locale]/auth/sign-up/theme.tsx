"use client"
import { THEMES } from "~/constant";
import { useSettings } from "~/context";

export default function Theme() {
  const { changeSetting, setting } = useSettings()!;

  return (
    <>
      <input
        type="radio"
        value={THEMES[0]}
        checked={setting.theme === "light"}
        aria-label="Light"
        name="theme"
        className="btn join-item"
        onChange={() => changeSetting("theme", "light")}
      />
      <input
        type="radio"
        value={THEMES[1]}
        checked={setting.theme === "dark"}
        aria-label="Dark"
        name="theme"
        className="btn join-item"
        onChange={() => changeSetting("theme", "dark")}
      />
    </>
  );
}
