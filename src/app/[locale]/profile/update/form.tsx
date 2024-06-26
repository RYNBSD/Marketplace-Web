import { Submit, Username } from "./form-client";
import { getLocale, getTranslations } from "next-intl/server";

export default async function UpdateForm() {
  const locale = await getLocale();
  const tForm = await getTranslations({
    locale,
    namespace: "Profile.Update.Form",
  });

  return (
    <form className="card-body">
      <div className="form-control">
        <label htmlFor="username" className="label">
          <span className="label-text">{tForm("username")} *</span>
        </label>
        <Username />
      </div>
      <div className="form-control">
        <label htmlFor="image" className="label">
          <span className="label-text">{tForm("pick-new-image")}</span>
        </label>
        <input
          type="file"
          name="image"
          className="file-input w-full max-w-xs"
          accept="image/*"
        />
      </div>
      <div className="form-control mt-6">
        <Submit />
      </div>
    </form>
  );
}
