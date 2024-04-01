import { getTranslations } from "next-intl/server";
import { Submit } from "./form-client";

export default async function CreateFrom() {
  const tForm = await getTranslations("Dashboard.Store.Categories.Create.Form")

  return (
    <form className="card-body">
      <div className="form-control">
        <label htmlFor="name" className="label">
          <span className="label-text">{tForm("name")} *</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder={tForm("name")}
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="nameAr" className="label">
          <span className="label-text">{tForm("arabic-name")} *</span>
        </label>
        <input
          type="text"
          name="nameAr"
          placeholder={tForm("arabic-name")}
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="image" className="label">
          <span className="label-text">{tForm("pick-new-image")} *</span>
        </label>
        <input
          type="file"
          name="image"
          className="file-input w-full max-w-xs"
          accept="image/*"
          required
        />
      </div>
      <div className="form-control mt-6">
        <Submit />
      </div>
    </form>
  );
}
