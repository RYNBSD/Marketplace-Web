"use client";

import type { Lang, Theme } from "~/types";
import { LANG, THEMES } from "~/constant";
import { useSettings } from "~/context";

export default function Setting() {
  const { setting, changeSetting } = useSettings()!;

  return (
    <section className="flex items-center justify-center" id="setting">
      <div className="grid grid-cols-1 place-items-center gap-5 w-full max-w-[768px] md:grid-cols-2">
        <select
          onChange={(e) => changeSetting("lang", e.target.value as Lang)}
          value={setting.lang}
          className="select select-bordered w-full max-w-xs"
        >
          {LANG.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => changeSetting("theme", e.target.value as Theme)}
          value={setting.theme}
          className="select select-bordered w-full max-w-xs"
        >
          {THEMES.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
        <div className="form-control w-52">
          <label className="cursor-pointer label">
            <span className="label-text">Disable animations</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={setting.disableAnimations}
              onChange={(e) =>
                changeSetting("disableAnimations", e.target.checked)
              }
            />
          </label>
        </div>
        <div className="form-control w-52">
          <label className="cursor-pointer label">
            <span className="label-text">Force theme</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={setting.forceTheme}
              onChange={(e) => changeSetting("forceTheme", e.target.checked)}
            />
          </label>
        </div>
      </div>
    </section>
  );
}
