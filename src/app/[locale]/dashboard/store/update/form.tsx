import { getLocale, getTranslations } from "next-intl/server";
import { Name, Submit } from "./form-client";

export default async function UpdateForm() {
  const locale = await getLocale();
  const tForm = await getTranslations({
    locale,
    namespace: "Dashboard.Store.Update.Form",
  });

  return (
    <form className="card-body">
      <div className="form-control">
        <label htmlFor="name" className="label">
          <span className="label-text">{tForm("name")} *</span>
        </label>
        <Name />
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
