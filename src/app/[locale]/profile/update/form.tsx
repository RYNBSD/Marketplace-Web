import { Csrf } from "~/components";
import { Username } from "./fields";
import Submit from "./submit";

export default async function UpdateForm() {
  return (
    <form className="card-body">
      <Csrf />
      <div className="form-control">
        <label className="label">
          <span className="label-text">Username *</span>
        </label>
        <Username />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">pick new image</span>
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
