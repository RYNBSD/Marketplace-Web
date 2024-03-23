import { getTranslations } from "next-intl/server";
import { DisableAnimations, ForceTheme, Locale, Theme } from "./setting-fields";

export default async function Setting() {
  const tSetting = await getTranslations("Profile.Setting")

  return (
    <section className="flex items-center justify-center" id="setting">
      <div className="grid grid-cols-1 place-items-center gap-5 w-full max-w-[768px] md:grid-cols-2">
        <Locale />
        <Theme />
        <div className="form-control w-52">
          <label className="cursor-pointer label">
            <span className="label-text">{tSetting("disable-animations")}</span>
            <DisableAnimations />
          </label>
        </div>
        <div className="form-control w-52">
          <label className="cursor-pointer label">
            <span className="label-text">{tSetting("force-theme")}</span>
            <ForceTheme />
          </label>
        </div>
      </div>
    </section>
  );
}
