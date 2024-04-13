import React from "react";
import { Categories, Colors, Infos, Sizes, Submit, Tags } from "./form-client";

export default async function CreateForm() {
  return (
    <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Title *</span>
          </div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            maxLength={50}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Description *</span>
          </div>
          <textarea
            name="description"
            placeholder="Description"
            maxLength={1000}
            className="textarea textarea-bordered h-24"
            required
          ></textarea>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">3D model (.glb)</span>
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
            <span className="label-text">Arabic title *</span>
          </div>
          <input
            name="titleAr"
            type="text"
            placeholder="Arabic title"
            maxLength={50}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Arabic description *</span>
          </div>
          <textarea
            name="descriptionAr"
            placeholder="Arabic description"
            maxLength={1000}
            className="textarea textarea-bordered h-24"
            required
          ></textarea>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Images *</span>
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
            <span className="label-text">Stock *</span>
          </div>
          <input
            type="number"
            min={1}
            defaultValue={1}
            name="stock"
            placeholder="stock"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Price *</span>
          </div>
          <input
            type="number"
            min={0}
            defaultValue={0}
            name="price"
            placeholder="Price"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Discount</span>
          </div>
          <input
            type="number"
            min={0}
            max={100}
            defaultValue={0}
            name="discount"
            placeholder="discount"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </div>
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Category *</span>
          </div>
          <select className="select select-bordered" name="categoryId">
            <Categories />
          </select>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Quality</span>
          </div>
          <select className="select select-bordered" name="quality">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <Sizes />
      </div>
      <div>
        <Colors />
      </div>
      <div>
        <Tags />
      </div>
      <Infos />
      <Submit />
    </form>
  );
}
