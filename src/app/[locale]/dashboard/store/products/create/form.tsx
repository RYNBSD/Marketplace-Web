import { Categories, Colors, Infos, Sizes, Submit, Tags } from "./form-client";
import { getTranslations } from "next-intl/server";

export default async function CreateForm() {
  const tForm = await getTranslations("Dashboard.Store.Products.Create.Form");

  return (
    <form className="flex flex-col gap-5 md:grid md:grid-cols-2">
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{tForm("title")} *</span>
          </div>
          <input
            type="text"
            name="title"
            placeholder={tForm("title")}
            maxLength={50}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">{tForm("description")} *</span>
          </div>
          <textarea
            name="description"
            placeholder={tForm("description")}
            maxLength={1000}
            className="textarea textarea-bordered h-24"
            required
          ></textarea>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{tForm("3d-model")} (.glb)</span>
          </div>
          <input
            name="models"
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            accept=".glb"
          />
        </label>
      </div>
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{tForm("arabic-title")} *</span>
          </div>
          <input
            name="titleAr"
            type="text"
            placeholder={tForm("arabic-title")}
            maxLength={50}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">{tForm("arabic-description")} *</span>
          </div>
          <textarea
            name="descriptionAr"
            placeholder={tForm("arabic-description")}
            maxLength={1000}
            className="textarea textarea-bordered h-24"
            required
          ></textarea>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{tForm("images")} *</span>
          </div>
          <input
            type="file"
            accept="image/*"
            name="images"
            className="file-input file-input-bordered w-full max-w-xs"
            multiple
            required
          />
        </label>
      </div>
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{tForm("stock")} *</span>
          </div>
          <input
            type="number"
            min={1}
            defaultValue={1}
            name="stock"
            placeholder={tForm("stock")}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{tForm("price")} *</span>
          </div>
          <input
            type="number"
            min={1}
            defaultValue={1}
            name="price"
            placeholder={tForm("price")}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{tForm("discount")}</span>
          </div>
          <input
            type="number"
            min={0}
            max={100}
            defaultValue={0}
            name="discount"
            placeholder={tForm("discount")}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </div>
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{tForm("category")} *</span>
          </div>
          <select className="select select-bordered" name="categoryId">
            <Categories />
          </select>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{tForm("Quality.quality")} *</span>
          </div>
          <select className="select select-bordered" name="quality" required>
            <option value="low">{tForm("Quality.low")}</option>
            <option value="medium">{tForm("Quality.medium")}</option>
            <option value="high">{tForm("Quality.high")}</option>
          </select>
        </label>
        <div>
          <label htmlFor="colors" className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">{tForm("add-colors")}</span>
            </div>
            <Colors />
          </label>
        </div>
      </div>
      <label htmlFor="sizes" className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{tForm("add-sizes")}</span>
        </div>
        <Sizes />
      </label>
      <label htmlFor="tags" className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{tForm("add-tags")}</span>
        </div>
        <Tags />
      </label>
      <Infos />
      <Submit />
    </form>
  );
}
