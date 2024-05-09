"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import {
  Categories,
  Colors,
  Images,
  Infos,
  Sizes,
  Submit,
  Tags,
} from "./form-client";
import { fetchProduct } from "~/api/store";

export default function CreateForm() {
  const tForm = useTranslations("Dashboard.Store.Products.Create.Form");
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<any>({});

  useEffect(() => {
    fetchProduct(searchParams.get("id") ?? "")
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((json) => {
        console.log(json);
        setProduct(json.data)
      });
  }, [searchParams]);

  return (
    <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{tForm("title")} *</span>
          </div>
          <input
            type="text"
            name="title"
            placeholder={tForm("title")}
            defaultValue={product?.product?.title ?? ""}
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
            defaultValue={product?.product?.description ?? ""}
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
            defaultValue={product?.product?.titleAr ?? ""}
            maxLength={50}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">{tForm("arabic-description")} *</span>
          </div>
          <textarea
            name="descriptionAr"
            placeholder={tForm("arabic-description")}
            defaultValue={product?.product?.descriptionAr ?? ""}
            maxLength={1000}
            className="textarea textarea-bordered h-24"
            required
          ></textarea>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{tForm("images")}</span>
          </div>
          <input
            type="file"
            accept="image/*"
            name="images"
            className="file-input file-input-bordered w-full max-w-xs"
            multiple
          />
        </label>
      </div>
      <div className="flex flex-wrap gap-2 col-span-2">
        <Images
          images={product?.product?.images ?? []}
          title={product?.product?.description ?? ""}
          titleAr={product?.product?.titleAr ?? ""}
        />
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
            defaultValue={product?.product?.price ?? ""}
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
            defaultValue={product?.product?.discount ?? ""}
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
          <select
            className="select select-bordered"
            defaultValue={product?.product?.category ?? ""}
            name="categoryId"
          >
            <Categories />
          </select>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{tForm("Quality.quality")} *</span>
          </div>
          <select
            className="select select-bordered"
            defaultValue={product?.product?.quality ?? ""}
            name="quality"
            required
          >
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
            <Colors colors={product?.product?.colors ?? []} />
          </label>
        </div>
      </div>
      <label htmlFor="sizes" className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{tForm("add-sizes")}</span>
        </div>
        <Sizes sizes={product?.product?.sizes ?? []} />
      </label>
      <label htmlFor="tags" className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{tForm("add-tags")}</span>
        </div>
        <Tags tags={product?.product?.tags ?? []} />
      </label>
      <Infos
        infos={product?.product?.infos ?? []}
        infosAr={product?.product?.infosAr ?? []}
      />
      <Submit />
    </form>
  );
}
