import { Name, Themes } from "./fields";
import { getTranslations } from "next-intl/server";
import Submit from "./submit";

export default async function BecomeSellerForm() {
  const tForm = await getTranslations("Profile.Become-Seller.Form");

  return (
    <form className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">{tForm("name")}</span>
        </label>
        <Name />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{tForm("pick-image")}</span>
        </label>
        <input
          required
          type="file"
          name="image"
          accept="image/*"
          className="file-input w-full max-w-xs"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{tForm("pick-theme")}</span>
        </label>
        <Themes />
      </div>
      <div className="form-control mt-6">
        <Submit />
      </div>
    </form>
  );
}
