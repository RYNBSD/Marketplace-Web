import { getLocale, getTranslations } from "next-intl/server";
import { Submit } from "./form-client";

export default async function UpdateForm({ name, nameAr }: Props) {
  const locale = await getLocale();
  const tForm = await getTranslations({
    locale,
    namespace: "Dashboard.Store.Categories.Update.Form",
  });

  return (
    <form className="card-body">
      <div className="form-control">
        <label htmlFor="name" className="label">
          <span className="label-text">{tForm("name")} *</span>
        </label>
        <input
          type="text"
          name="name"
          defaultValue={name}
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
          defaultValue={nameAr}
          placeholder={tForm("arabic-name")}
          className="input input-bordered"
          required
        />
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

type Props = {
  name: string;
  nameAr: string;
};
