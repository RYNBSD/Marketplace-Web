import { Username } from "./fields";
import Submit from "./submit";
import { getTranslations } from "next-intl/server";

export default async function UpdateForm() {
  const tForm = await getTranslations("Profile.Update.Form");

  return (
    <form className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">{tForm("username")} *</span>
        </label>
        <Username />
      </div>
      <div className="form-control">
        <label className="label">
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
